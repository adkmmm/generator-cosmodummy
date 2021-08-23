const Generator = require('yeoman-generator') ;
const moment = require('moment') ;

module.exports = class extends Generator
{

  // Constructor
  
  constructor (args, opts)
  {
    
    super (args, opts) ;

    this.config.getAll() ;

    this.config.defaults
    (
      {
        appName: 'DummyApp',
        projectDescription: 'An app that does nothing',
        projectPath: 'CppProject',
        projectPackage: 'cpp-project',
        authorName: 'Alex Deng',
        authorEmail: 'alex@deng.com',
        appPriority: '0',
        appVersion: '0',
        messageListen: 'BSM',
        eventListen: 'GPS',
      }
    ) ;

    this.interactive = true ;

    this.option
    (
      'auto',
      {
        desc: 'Automatic mode',
        type: Boolean,
        default: false
      }
    ) ;
    
    this.option
    (
      'custom',
      {
        desc: 'Enable code custom',
        type: Boolean,
        default: false
      }
    ) ;

    if (this.options.auto)
    {
      this.interactive = false ;
    }

    if (this.options.custom)
    {
      this.config.set('buildCodecustom', true) ;
    }

    this.argument('name', { type: String, required: false }) ;
    this.argument('author', { type: String, required: false }) ;
    this.argument('email', { type: String, required: false }) ;

    if (this.options.name)
    {
      this.config.set('appName', this.options.name) ;
      this.config.set('projectPath', this.options.name) ;
      this.config.set('projectPackage', this.options.name) ;
      this.interactive = false ;
    }

    if (this.options.author)
    {
      this.config.set('authorName', this.options.author) ;
      this.interactive = false ;
    }

    if (this.options.email)
    {
      this.config.set('authorEmail', this.options.email) ;
      this.interactive = false ;
    }
  
  }

  // Run loop

  initializing ()
  {
    
    let currentDate = moment() ;

    this.year = currentDate.format('YYYY') ;
    this.date = currentDate.format('D MMM YYYY') ;

  }

  prompting ()
  {

    if (!this.interactive)
    {
      return ;
    }
    
    return this.prompt
    (
      [
        {
          type: 'input',
          name: 'appName',
          message: 'App name:',
          default: this.config.get('appName')
        },
        {
          type: 'input',
          name: 'projectDescription',
          message: 'Project description:',
          default: this.config.get('projectDescription')
        },
        {
          type: 'input',
          name: 'projectPath',
          message: 'Project path:',
          default: this.config.get('projectPath')
        },
        {
          type: 'input',
          name: 'projectPackage',
          message: 'Project package name:',
          default: this.config.get('projectPackage')
        },
        {
          type: 'input',
          name: 'authorName',
          message: 'Author name:',
          default: this.config.get('authorName')
        },
        {
          type: 'input',
          name: 'authorEmail',
          message: 'Author e-mail:',
          default: this.config.get('authorEmail')
        },
        {
          type: 'input',
          name: 'appPriority',
          message: 'App Priority (0 to 7 from low to high):',
          default: this.config.get('appPriority')
        },
        {
          type: 'input',
          name: 'appVersion',
          message: 'App Version (0 to 1): ',
          default: this.config.get('appVersion')
        },
        {
          type: 'list',
          name: 'messageListen',
          message: 'What message to listen to?',
          choices:
          [
            {
              name: 'BSM',
              value: 'BSM'
            },
            {
              name: 'RSA',
              value: 'RSA'
            },
            {
              name: 'TIM',
              value: 'TIM'
            }
          ],
          default: this.config.get('messageListen')
        },
        {
          type: 'list',
          name: 'eventListen',
          message: 'What event to listen to?',
          choices:
          [
            {
              name: 'GPS',
              value: 'GPS'
            }
          ],
          default: this.config.get('eventListen')
        }
      ]
    )
    .then 
    (
      (answers) =>
      {
        
        this.config.set('appName', answers['appName']) ;
        this.config.set('projectDescription', answers['projectDescription']) ;
        this.config.set('projectPath', answers['projectPath']) ;
        this.config.set('projectPackage', answers['projectPackage']) ;
        this.config.set('authorName', answers['authorName']) ;
        this.config.set('authorEmail', answers['authorEmail']) ;
        this.config.set('messageListen', answers['messageListen']) ;
        this.config.set('eventListen', answers['eventListen']) ;
        switch (answers['appPriority']) {
          case 0:
            this.config.set('appPriority', 'kLowest');
            break;
          case 1:
            this.config.set('appPriority', 'kVeryLow');
            break;
          case 2:
            this.config.set('appPriority', 'kLow');
            break;
          case 3:
            this.config.set('appPriority', 'kNormal');
            break;
          case 4:
            this.config.set('appPriority', 'kAboveNormal');
            break;
          case 5:
            this.config.set('appPriority', 'kHigh');
            break;
          case 6:
            this.config.set('appPriority', 'kVeryHigh');
            break;
          case 7:
            this.config.set('appPriority', 'kHighest');
            break;
        };

        switch (answers['appVersion']) {
          case 0:
            this.config.set('appVersion', 'kVersion_0_1');
            break;
          case 1:
            this.config.set('appVersion', 'kVersion_1_0');
            break;
        }
      }
    ) ;

  }

  configuring ()
  {
    
  }
  
  default ()
  {
    
  }
  
  writing ()
  {
    
    this._setupSrc() ;

  }
  
  conflicts ()
  {
    
  }
  
  install ()
  {
    
  }
  
  end ()
  {
    this.config.save() ;
  }

  // Private methods

  _setupSrc ()
  {
    this.fs.copyTpl
    (
      this.templatePath('DummyApp.cpp'),
      this.destinationPath(this.config.get('projectPath') + '/src/' + this.config.get('appName') + '.cpp'),
      {
        year: this.year,
        date: this.date,
        appName: this.config.get('appName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        projectDescription: this.config.get('projectDescription'),
        appPriority: this.config.get('appPriority'),
        appVersion: this.config.get('appVersion'),
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('DummyApp.h'),
      this.destinationPath(this.config.get('projectPath') + '/src/' + this.config.get('appName') + '.h'),
      {
        appName: this.config.get('appName'),
      }
    ) ;

  }
} ;