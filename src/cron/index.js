const cron = require("node-cron")
const { getRndInteger } = require("../utils/random-number")
const { handleGetAllSensorCronJob } = require("../controller/sensorController")
const {
  handleCreateSensorDataService,
} = require("../services/sensorDataServices")

const updateSensorData = cron.schedule(
  "* */5 * * * *",
  async () => {
    try {
      const value = getRndInteger(40, 90)
      const response = await handleGetAllSensorCronJob()
      if (response.status) {
        response.data.forEach((sensor) => {
          const body = {
            sensorID: sensor.id,
            time: new Date().getTime(),
            locationID: 1,
            value: value,
            delete: 2,
          }
          handleCreateSensorDataService(body)
        })
      }
    } catch (err) {
      console.log(er)
    }
  },
  {
    scheduled: false,
  },
)

module.exports = {
  updateSensorData,
}
