import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import clx from 'classnames'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

export const TextTestimonial = () => {
  const limit = 250
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose focus:outline-none min-h-[200px]',
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
    <div className='border rounded-xl p-4 min-h-[250px]'>
      <EditorContent editor={editor} />
      <div className="flex justify-end">
        <span className="text-accent-3 text-sm font-semibold">{editor?.storage.characterCount.characters()}/{limit}</span>
      </div>
    </div>
  )
}
