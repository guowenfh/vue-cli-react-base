import * as models from './models'
import { init } from '@rematch/core'
import immerPlugin from '@rematch/immer'
import createLoadingPlugin from '@rematch/loading'

const immer = immerPlugin()

// see options API below
const options = {}

const loading = createLoadingPlugin(options)

const store = init({ models, plugins: [immer, loading] })
export default store
