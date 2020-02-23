const inquirer = require('inquirer')
const fs = require('fs')


const mainPrompt = inquirer.createPromptModule()
const memPrompt = inquirer.createPromptModule()

let team = []

const teamMember = (type, name, email, github) => ({
  type,
  name,
  email,
  github
})

function buildHTML() {
  let part1 =
    `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Team Members</h1>
      <p class="lead">Here are the team members assigned to this project.</p>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-6">
      <!-- Team members -->
      <div class="row">
  `
  let part2 =
    `
   </div>
      <!-- End team members -->
    </div>
    <div class="col-sm-3"></div>
  </div>

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>
  `

  fs.writeFile('./build/team.html', '', err => {
    if (err) { console.log(err) }
  })
  fs.appendFile('./build/team.html', part1, err => {
    if (err) { console.log(err) }
    team.forEach(member => {
      let memberHTML = `
     <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${member.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${member.type}</h6>
              <p class="card-text">Email: ${member.email}</p>
              <p class="card-text">Github: ${member.github}</p>
            </div>
          </div>
        </div>
    `
      fs.appendFile('./build/team.html', memberHTML, err => {
        if (err) { console.log(err) }
        fs.appendFile('./build/team.html', part2, err => {
          if (err) { console.log(err) }
        })
        console.log('HTML Created')
      })
    })
  })
}

function init() {
  mainPrompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Add Member', 'Generate HTML']
    }
  ])
    .then(({ action }) => {
      switch (action) {
        case 'Add Member':
          newMember()
          break
        case 'Generate HTML':
          buildHTML()
          break
      }
    })
}

function newMember() {
  memPrompt([
    {
      type: 'list',
      name: 'type',
      message: 'Please select team member type:',
      choices: ['Manager', 'Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'name',
      message: 'Team member name?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Team member email?'
    },
    {
      type: 'input',
      name: 'github',
      message: 'Team member github username?'
    }
  ])
    .then(({ type, name, email, github }) => {
      team.push(teamMember(type, name, email, github))
      init()
    })
}

init()