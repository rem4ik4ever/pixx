import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import clx from "classnames"
import { Draggable } from "./components/Draggable"
import { Droppable } from "./components/Droppable"
import { FormElement, Props as FormElementProps, Position, Layout } from "./components/Element"
import { FormInput } from "./components/Input"
import { Sortable } from "./components/Sortable"
import { FormText } from "./components/Text"
import { Element } from "./types"

const Elements = {
  'text': FormText,
  'input': FormInput
}

export const Constructor = ({ elements, activeIndex }: { elements: Element[], activeIndex: number }) => {
  return (
    <div className="flex justify-center items-center mx-auto">
      <Droppable id="constructor">
        <div className={clx("shadow-md min-w-[550px] min-h-[650px]", elements.length === 0 ? ['flex', 'justify-center', 'items-center'] : ['flex', 'flex-col'])}>
          {elements.length === 0 && <span>Drop elements here</span>}
          {elements.map((element, index) => (
            <SortableElement
              id={element.id}
              index={index + 1}
              key={element.id}
              layout={Layout.Vertical}
              activeIndex={activeIndex}
              onRemove={() => 'hello'}

            />
          ))}
        </div>
      </Droppable>
    </div>
  )
}
function SortableElement({
  id,
  activeIndex,
  ...props
}: FormElementProps & { activeIndex: number }) {
  const {
    attributes,
    listeners,
    index,
    isDragging,
    isSorting,
    over,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges: always,
  });

  return (
    <FormElement
      ref={setNodeRef}
      id={id}
      active={isDragging}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      insertPosition={
        over?.id === id
          ? index > activeIndex
            ? Position.After
            : Position.Before
          : undefined
      }
      {...props}
      {...attributes}
      {...listeners}
    />
  );
}

function always() {
  return true;
}
