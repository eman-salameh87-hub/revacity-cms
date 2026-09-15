// components/admin/block-builder.tsx
'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';
import {
  DndContext, KeyboardSensor, PointerSensor, closestCenter,
  useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, sortableKeyboardCoordinates, useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { RichTextBlockEditor } from './rich-text-block-editor';
import { BlockEditor } from './block-editors';
import { MediaField } from './media-field';
import {
  ALL_BLOCK_TYPES, BLOCK_LABEL_KEYS, EDITABLE_BLOCKS, createDefaultBlock,
  type BlockType,
} from '@/lib/blocks/defaults';
import type { ContentBlock } from '@/lib/blocks/types';
import { useT } from './i18n-provider';

interface BlockBuilderProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  /** Set by NestedBlocksEditor. See the drag handle in BlockItem. */
  nested?: boolean;
  /**
   * Prefix for this builder's data-test-id values. Accordion and tabs recurse
   * into another BlockBuilder, so without a prefix an inner list emits the same
   * ids as the outer one — `block-drag-0` existed twice on the page and a
   * selector could match either. Each nesting level extends the prefix, so a
   * nested handle reads `block-0-0-drag-0`. Top level keeps the bare `block-`
   * names.
   */
  testScope?: string;
}

let keyCounter = 0;
const nextKey = () => `blk-${(keyCounter += 1)}`;

export function BlockBuilder({
  blocks,
  onChange,
  nested = false,
  testScope = 'block',
}: BlockBuilderProps) {
  const t = useT();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  /**
   * Stable per-block keys. Using the array index as a React key means that
   * reordering or deleting re-associates component state with the wrong block —
   * a TipTap editor would keep the previous block's document.
   */
  const [keys, setKeys] = useState<string[]>(() => blocks.map(nextKey));

  // Deliberately keyed on the length alone: depending on `blocks` would re-run
  // this on every keystroke in a block. The body is a no-op for equal lengths,
  // so the extra runs would be harmless but pointless.
  useEffect(() => {
    // Resync if blocks are replaced wholesale (e.g. switching locale tab).
    setKeys((prev) => (prev.length === blocks.length ? prev : blocks.map(nextKey)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks.length]);

  // Close the picker on outside click or Escape.
  useEffect(() => {
    if (!showAddMenu) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowAddMenu(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowAddMenu(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [showAddMenu]);

  const addBlock = (type: BlockType) => {
    const key = nextKey();
    setKeys((prev) => [...prev, key]);
    onChange([...blocks, createDefaultBlock(type)]);
    setExpanded(key);
    setShowAddMenu(false);
  };

  const updateBlock = (index: number, block: ContentBlock) => {
    onChange(blocks.map((b, i) => (i === index ? block : b)));
  };

  const removeBlock = (index: number) => {
    setKeys((prev) => prev.filter((_, i) => i !== index));
    onChange(blocks.filter((_, i) => i !== index));
  };

  // Pointer sensor with a small activation distance so a click on the header
  // buttons is not swallowed as a drag. Keyboard sensor keeps reordering
  // operable without a mouse.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const from = keys.indexOf(String(active.id));
    const to = keys.indexOf(String(over.id));
    if (from < 0 || to < 0) return;

    const reorder = <T,>(arr: T[]): T[] => {
      const copy = [...arr];
      const [moved] = copy.splice(from, 1);
      if (moved === undefined) return arr;
      copy.splice(to, 0, moved);
      return copy;
    };

    setKeys(reorder);
    onChange(reorder(blocks));
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;

    // Explicit reads rather than a destructured splice: under
    // noUncheckedIndexedAccess the spliced value is `T | undefined`.
    const swap = <T,>(arr: T[]): T[] => {
      const copy = [...arr];
      const a = copy[index];
      const b = copy[target];
      if (a === undefined || b === undefined) return arr;
      copy[index] = b;
      copy[target] = a;
      return copy;
    };

    setKeys(swap);
    onChange(swap(blocks));
  };

  return (
    <div className="space-y-4" data-test-id={`${testScope}-builder`}>
      {blocks.length === 0 && (
        <p className="rounded-lg border border-dashed border-[var(--admin-line)] p-8 text-center text-sm text-[var(--admin-text-muted)]">
          {t('blocks.empty')}
        </p>
      )}

      {/* Nested builders (accordion/tabs) create their own DndContext inside
          this one. Verified: dragging an inner block with the pointer reorders
          only the inner list and leaves this one untouched, because the
          listeners useSortable hands to a handle belong to the nearest
          context. Ids are unique across every builder on the page (the key
          counter is module-level) and handleDragEnd bails on an id it does not
          own, so a stray event cannot corrupt the wrong list either.

          The keyboard sensor does NOT survive nesting — see the handle. */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={keys} strategy={verticalListSortingStrategy}>
          <ul className="space-y-4" id={listId}>
            {blocks.map((block, idx) => {
              const key = keys[idx] ?? `fallback-${idx}`;
              return (
                <BlockItem
                  key={key}
                  sortId={key}
                  domId={`${listId}-${key}`}
                  index={idx}
                  total={blocks.length}
                  block={block}
                  nested={nested}
                  testScope={testScope}
                  isExpanded={expanded === key}
                  onToggle={() => setExpanded(expanded === key ? null : key)}
                  onUpdate={(b) => updateBlock(idx, b)}
                  onRemove={() => removeBlock(idx)}
                  onMove={(dir) => moveBlock(idx, dir)}
                />
              );
            })}
          </ul>
        </SortableContext>
      </DndContext>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setShowAddMenu((v) => !v)}
          aria-expanded={showAddMenu}
          aria-haspopup="menu"
          className="admin-btn-primary w-full"
          data-test-id={`${testScope}-add`}
        >
          <Plus size={18} aria-hidden="true" />
          {t('blocks.add')}
        </button>

        {showAddMenu && (
          <div
            role="menu"
            aria-label={t('blocks.types')}
            className="absolute z-50 mt-2 w-full rounded-lg border border-[var(--admin-line)] bg-[var(--admin-elevated)] shadow-xl max-h-80 overflow-y-auto admin-scroll"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--admin-line)]">
              <span className="text-xs text-[var(--admin-text-muted)]">{t('blocks.chooseType')}</span>
              <button
                type="button"
                onClick={() => setShowAddMenu(false)}
                aria-label={t('common.close')}
                className="rounded p-1 hover:bg-white/5"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>

            <div className="p-2 grid grid-cols-2 gap-1">
              {ALL_BLOCK_TYPES.map((type) => {
                const editable = EDITABLE_BLOCKS.has(type);
                return (
                  <button
                    key={type}
                    type="button"
                    role="menuitem"
                    onClick={() => addBlock(type)}
                    data-test-id={`${testScope}-add-${type}`}
                    className="flex items-center justify-between gap-2 rounded px-3 py-2 text-start text-sm transition-colors hover:bg-white/5"
                  >
                    <span>{t(BLOCK_LABEL_KEYS[type])}</span>
                    {/* Honest about which pickers lead to a real editor. */}
                    {!editable && (
                      <span className="shrink-0 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] text-amber-400">
                        {t('blocks.soon')}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BlockItem({
  sortId,
  domId,
  nested,
  testScope,
  index,
  total,
  block,
  isExpanded,
  onToggle,
  onUpdate,
  onRemove,
  onMove,
}: {
  sortId: string;
  domId: string;
  nested: boolean;
  testScope: string;
  index: number;
  total: number;
  block: ContentBlock;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (b: ContentBlock) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  const t = useT();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: sortId });

  return (
    <li
      ref={setNodeRef}
      // The visible label is translated, so it cannot be asserted on without
      // pinning the suite to one admin language. This exposes the type itself.
      data-block-type={block.type}
      data-test-id={`${testScope}-item-${index}`}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        'rounded-lg border border-[var(--admin-line)] bg-[var(--admin-surface)]',
        // The row being dragged has to sit above its siblings, or it slides
        // underneath the ones it is passing and looks like it vanished.
        isDragging && 'relative z-10 opacity-80 shadow-lg'
      )}
    >
      <div className="flex items-center gap-2 p-3 border-b border-[var(--admin-line)]">
        {/* A real handle now. It must be a button at the top level: the
            keyboard sensor needs a focusable element to receive space/arrow
            keys, and `attributes` carries the roledescription and instructions
            a screen reader reads out. `touch-none` stops the browser scrolling
            the page instead of starting a drag on touch.

            Inside a nested builder the keyboard sensor never fires — the
            surrounding DndContext takes the key first, so pick-up never
            happens. Pointer drag there works fine. Rather than leave a tab
            stop that does nothing when activated, the nested handle is taken
            out of the tab order: keyboard users reorder with the up/down
            buttons, which are labelled and work at every depth. */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          tabIndex={nested ? -1 : attributes.tabIndex}
          aria-label={t('blocks.dragHandle', { n: index + 1 })}
          data-test-id={`${testScope}-drag-${index}`}
          className="cursor-grab touch-none rounded p-1 text-[var(--admin-text-muted)] hover:bg-white/5 active:cursor-grabbing"
        >
          <GripVertical size={16} aria-hidden="true" />
        </button>

        <span className="flex-1 text-sm font-medium">
          {t(BLOCK_LABEL_KEYS[block.type])}
          <span className="ms-2 text-xs text-[var(--admin-text-muted)]" dir="ltr">
            #{index + 1}
          </span>
        </span>

        {/* These handlers existed in the original but no buttons ever rendered
            them, so blocks could not be reordered at all. */}
        <button
          type="button"
          onClick={() => onMove(-1)}
          disabled={index === 0}
          aria-label={t('blocks.moveUp', { n: index + 1 })}
          data-test-id={`${testScope}-up-${index}`}
          className="rounded p-1.5 hover:bg-white/5 disabled:opacity-30"
        >
          <ChevronUp size={16} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onMove(1)}
          disabled={index === total - 1}
          aria-label={t('blocks.moveDown', { n: index + 1 })}
          data-test-id={`${testScope}-down-${index}`}
          className="rounded p-1.5 hover:bg-white/5 disabled:opacity-30"
        >
          <ChevronDown size={16} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={domId}
          aria-label={isExpanded ? t('blocks.collapse') : t('blocks.expand')}
          data-test-id={`${testScope}-toggle-${index}`}
          className="rounded p-1.5 hover:bg-white/5"
        >
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={cn('transition-transform', isExpanded && 'rotate-180')}
          />
        </button>

        <button
          type="button"
          onClick={onRemove}
          aria-label={t('blocks.deleteSection', { n: index + 1 })}
          data-test-id={`${testScope}-remove-${index}`}
          className="rounded p-1.5 text-red-400 hover:bg-red-500/10"
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>

      {isExpanded && (
        <div id={domId} className="p-4">
          {block.type === 'rich-text' ? (
            <RichTextBlockEditor block={block} onChange={onUpdate} />
          ) : block.type === 'accordion' ? (
            <NestedBlocksEditor
              entries={block.items}
              testScope={`${testScope}-${index}`}
              labelKey="title"
              labelText={t('blocks.itemTitle')}
              addLabel={t('blocks.addItem')}
              onChange={(items) => onUpdate({ ...block, items })}
            />
          ) : block.type === 'tabs' ? (
            <NestedBlocksEditor
              entries={block.items}
              testScope={`${testScope}-${index}`}
              labelKey="label"
              labelText={t('blocks.tabName')}
              addLabel={t('blocks.addTab')}
              onChange={(items) => onUpdate({ ...block, items })}
            />
          ) : (
            <BlockEditor block={block} onChange={onUpdate} />
          )}

          {/* Every block type, regardless of its own fields: an editor can
             give any section its own background colour and/or background
             video without that being a per-type field. See BlockStyle in
             lib/blocks/types.ts and BlockRenderer in content-renderer.tsx. */}
          <BlockStyleFields
            block={block}
            onChange={onUpdate}
            testScope={`${testScope}-${index}`}
          />
        </div>
      )}
    </li>
  );
}

/**
 * accordion and tabs nest ContentBlock[], so their editor recurses into
 * BlockBuilder.
 *
 * This lives in block-builder.tsx rather than block-editors.tsx on purpose:
 * block-builder already imports block-editors, so putting it there would make
 * the two modules import each other.
 */
function NestedBlocksEditor<K extends 'title' | 'label'>({
  entries,
  testScope,
  labelKey,
  labelText,
  addLabel,
  onChange,
}: {
  entries: Array<{ content: ContentBlock[] } & Record<K, string>>;
  testScope: string;
  labelKey: K;
  labelText: string;
  addLabel: string;
  onChange: (entries: Array<{ content: ContentBlock[] } & Record<K, string>>) => void;
}) {
  const t = useT();
  const update = (
    index: number,
    patch: Partial<{ content: ContentBlock[] } & Record<K, string>>
  ) => onChange(entries.map((e, i) => (i === index ? { ...e, ...patch } : e)));

  return (
    <div className="space-y-3" data-test-id={`${testScope}-items`}>
      {entries.map((entry, index) => (
        <div
          key={index}
          className="space-y-3 rounded-md border border-[var(--admin-line)] bg-[var(--admin-elevated)] p-3"
        >
          <div className="flex items-end gap-2">
            <label className="block flex-1">
              <span className="mb-1 block text-xs text-[var(--admin-text-secondary)]">
                {labelText}
              </span>
              <input
                type="text"
                className="admin-input py-2 text-sm"
                value={entry[labelKey]}
                onChange={(e) =>
                  update(index, { [labelKey]: e.target.value } as Partial<
                    { content: ContentBlock[] } & Record<K, string>
                  >)
                }
                data-test-id={`${testScope}-label-${index}`}
              />
            </label>
            <button
              type="button"
              onClick={() => onChange(entries.filter((_, i) => i !== index))}
              aria-label={t('blocks.deleteN', { n: index + 1 })}
              className="rounded p-2 text-[var(--admin-danger)] hover:bg-red-500/10"
            >
              <Trash2 size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="border-s-2 border-[var(--admin-line)] ps-3">
            <BlockBuilder
              nested
              testScope={`${testScope}-${index}`}
              blocks={entry.content}
              onChange={(content) =>
                update(index, { content } as Partial<
                  { content: ContentBlock[] } & Record<K, string>
                >)
              }
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          onChange([
            ...entries,
            { [labelKey]: '', content: [] } as unknown as {
              content: ContentBlock[];
            } & Record<K, string>,
          ])
        }
        className="admin-btn-ghost w-full justify-center border border-dashed border-[var(--admin-line)]"
        data-test-id={`${testScope}-add-item`}
      >
        <Plus size={14} aria-hidden="true" />
        {addLabel}
      </button>
    </div>
  );
}


/**
 * Background colour + background video, offered on every block regardless of
 * type. See BlockStyle in lib/blocks/types.ts for why these live on the union
 * itself rather than being redeclared per variant, and BlockRenderer in
 * content-renderer.tsx for how they render.
 */
function BlockStyleFields({
  block,
  onChange,
  testScope,
}: {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
  testScope: string;
}) {
  const t = useT();
  const swatch = /^#[0-9a-f]{6}$/i.test(block.background ?? '') ? (block.background as string) : '#000000';

  return (
    <div className="mt-4 space-y-3 rounded-md border border-dashed border-[var(--admin-line)] p-3">
      <p className="text-xs font-medium text-[var(--admin-text-secondary)]">{t('blocks.style')}</p>

      <div>
        <label
          htmlFor={`${testScope}-bg-color`}
          className="mb-1 block text-xs text-[var(--admin-text-muted)]"
        >
          {t('blocks.backgroundColor')}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            id={`${testScope}-bg-color`}
            value={swatch}
            onChange={(e) => onChange({ ...block, background: e.target.value })}
            className="h-9 w-9 shrink-0 cursor-pointer rounded border border-[var(--admin-line)] bg-transparent p-0.5"
            data-test-id={`${testScope}-bg-color-swatch`}
          />
          <input
            type="text"
            dir="ltr"
            className="admin-input flex-1 text-sm"
            placeholder="#0a0315"
            value={block.background ?? ''}
            onChange={(e) => onChange({ ...block, background: e.target.value || undefined })}
            data-test-id={`${testScope}-bg-color-text`}
          />
          {block.background && (
            <button
              type="button"
              onClick={() => onChange({ ...block, background: undefined })}
              className="admin-btn-ghost shrink-0 px-2 py-1.5 text-xs"
              data-test-id={`${testScope}-bg-color-clear`}
            >
              {t('blocks.backgroundClear')}
            </button>
          )}
        </div>
        <p className="mt-1 text-xs text-[var(--admin-text-muted)]">{t('blocks.backgroundColorHint')}</p>
      </div>

      <MediaField
        label={t('blocks.backgroundVideo')}
        hint={t('blocks.backgroundVideoHint')}
        value={block.backgroundVideo ?? ''}
        onChange={(backgroundVideo) => onChange({ ...block, backgroundVideo: backgroundVideo || undefined })}
        testId={`${testScope}-bg-video`}
        preview={false}
      />
    </div>
  );
}
