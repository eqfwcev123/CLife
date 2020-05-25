import * as os from "os";
import * as path from "path";
import * as childProcess from "child_process";
const { exec } = childProcess;

const IP: string = "13.124.20.83";
const HOST: string = "ubuntu";
const TARGET: string = `${HOST}@${IP}`;
const HOME: string = os.homedir();
const SSH_KEY: string = path.join(HOME, ".ssh", "CLife.pem");
const PROJECT_FILE: string = path.join(HOME, "node", "corona-life2");
const DOCKER_IMAGE_TAG: string = "eqfwcev123/clife";
const DOCKER_OPTIONS: Array<object> = [
  { "--rm": "" },
  { "-it": "" },
  { "-d": "" },
  { "-p": "80:80" },
  { "-p": "443:443" },
  { "--name": "clife_container" },
];

function run(cmd: string) {
  let process = exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(`에러는 : ${err}`);
      return;
    }
    console.log(`stdout는 : ${stdout}`);
    console.error(`stderr는 : ${stderr}`);
  });
}
