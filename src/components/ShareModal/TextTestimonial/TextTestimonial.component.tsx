import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import s from './TextTestimonial.module.css'
import Placeholder from '@tiptap/extension-placeholder'


interface Props {
  onChange: (c: string) => void;
  value: string;
}
export const TextTestimonial = ({ value, onChange }: Props) => {
  const limit = 250
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: s.editor as string,
      },
    },
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit,
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: 'Please add your feedback'
      })
    ],
    content: value,
    onUpdate({ editor }) {
      if (editor.isEmpty) {
        onChange('')
      } else {
        onChange(editor.getHTML())
      }
    }
  })

  return (
    <div className='border rounded-xl px-4 min-h-[250px] text-primary'>
      <EditorContent editor={editor} />
      <div className="flex justify-end">
        <span className="text-accent-3 text-sm font-semibold">{editor?.storage.characterCount.characters()}/{limit}</span>
      </div>
    </div>
  )
}
