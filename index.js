import async from 'async';
import series from 'async/series';
import low from 'lowdb';
import fileAsync from 'lowdb/lib/file-async';
import { Download } from 'node-curl-download';

const db = low('db.json', {
  storage: fileAsync
});

let data = [];

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

const categories = db.get('category').value();
for(let i = 0; i < categories.length; i++) {
  const exercises = categories[i].exercises;
  for(let j = 0; j < exercises.length; j++) {
    const filename = exercises[j].id.split('_').join('');
    data.push(`${filename}.jpg`);
    data.push(`${filename}.mp4`);
  }
}
for(let i = 0; i < data.length; i++) {
  tasks.push(serie);
}
console.log(`Reading data from JSON file is finished successfully.`);

async.series(tasks,
// optional callback
(err, results) => {
    // results is now equal to ['one', 'two']
});
