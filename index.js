import async from 'async';
import series from 'async/series';
import { Download } from 'node-curl-download';

const data = ["hanginglegraise.jpg", "hanginglegraise.mp4"];
const tasks = [];

const serie = callback => {
  const name = data.shift();
  const isLast = data.length == 0
  const dl = new Download(`http://cdn.muscleandstrength.com/video/${name}`,
    `tmp/${name}`);

  dl.on('end', function(code) {
    if (code === 0) {
      console.log(`Downloading ${name} is finished successfully.`);
      callback(null, name);
    } else {
      console.log(`Downloading ${name} is finished unsuccessfully.`);
    }
    if(isLast) process.exit(code);
  });

  dl.start();
}

for(let i = 0; i < data.length; i++) {
  tasks.push(serie);
}

async.series(tasks,
// optional callback
(err, results) => {
    // results is now equal to ['one', 'two']
});
