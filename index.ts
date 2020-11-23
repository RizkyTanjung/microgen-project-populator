import * as faker from 'faker'
import ProjectServices from './requester'
import sleep from './sleep'

/**
 * the header provided will be use to all create, update delete operation to project endpoint
 */
const header = {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MDYxMTg4MDcsImV4cCI6MTYwODcxMDgwNywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNWZiYjZkNzg1M2Q0YzQwMDcxYWI0MjE2IiwianRpIjoiNjZhMjFkZjQtNmJlNi00YzE5LWFkMmQtYmMxMDNmY2VmMmQxIn0.yrsUJ70nkNSbb_MjrpVDuvasgTF2AgraPydkK7FNqzo"
}

const totalRow = process.argv[2] || 10


/**
 * Use this function to operate crud to project
 * @property { object } create - to create to specific table
 * @property { object } update - to update to specific table
 * @property { object } delete - to delete to specific table
 */

const projectService = new ProjectServices({ header })

/**
 * @param { string } param.tableName - table name to create, this params should be plural eg. (products)
 * @param { object } param.body - you need send request body to create a new record
 */

const createRecord = projectService.create

const listStatus: string[] = ['DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVE']

const tableName: string = "posts";

let doneTask: number = 1;

(
  async function main(){
    for ( let i = 1; i <= totalRow; i ++){
      try {
        const body = {
          date: faker.time.recent(),
          text: faker.lorem.sentence(),
          status: listStatus[Math.floor(Math.random() * listStatus.length)]
        };
  
        const res = await createRecord({ tableName, body })
        console.log('status',res.status)

        if(doneTask >= 10){
          doneTask = 0
          console.log('cooldown 2000ms')
          await sleep(2000)
        }


      } catch (e) {
        console.log('error', e.message)
      }

      doneTask++
    }
  }
)()

