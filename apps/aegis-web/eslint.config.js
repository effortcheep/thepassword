import createConfig from '@repo/eslint-config/create-config'

export default createConfig(
  {
    solid: true,
  },
  {
    files: ['*/components/*'],
    rules: {
      'unicorn/filename-case': ['error', {
        case: 'pascalCase',
      }],
    },
  },
)
