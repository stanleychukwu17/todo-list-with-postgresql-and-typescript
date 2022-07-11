import logger from 'pino'

export default logger({
    pettyPrint: true,
    base: {pid: false}
})