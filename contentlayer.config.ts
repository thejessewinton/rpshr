import { defineDocumentType, defineNestedType, makeSource, type ComputedFields } from 'contentlayer/source-files'

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `${doc._raw.sourceFileName.replace(/\.mdx?$/, '')}`
  }
}

export const Index = defineDocumentType(() => ({
  name: 'Index',
  filePathPattern: 'index.md',
  contentType: 'markdown',
  isSingleton: true,
  fields: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    }
  },
  computedFields
}))

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Index]
})
