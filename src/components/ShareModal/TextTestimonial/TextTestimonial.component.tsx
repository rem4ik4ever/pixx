import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Button from '@components/ui/Button'
import s from './TextTestimonial.module.css'

export const TextTestimonial = () => {
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
      })
    ],
    content: `
    <p>
      Please share your feedback
    </p>
    `,
  })

  return (
    <div>
      <div className='border rounded-xl px-4 min-h-[250px] text-primary'>
        <EditorContent editor={editor} />
        <div className="flex justify-end">
          <span className="text-accent-3 text-sm font-semibold">{editor?.storage.characterCount.characters()}/{limit}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button className="rounded-xl bg-blue-400" variant='slim'>Submit</Button>
      </div>
    </div >
  )
}
