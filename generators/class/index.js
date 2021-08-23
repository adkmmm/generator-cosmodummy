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
        className: 'MyNewClass',
        parentClassName: '',
        headerOnly: false
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

    if (this.options.auto)
    {
      this.interactive = false ;
    }

    this.argument('name', { type: String, required: false }) ;

    if (this.options.name)
    {
      this.config.set('className', this.options.name) ;
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
          name: 'className',
          message: 'Class name:',
          default: this.config.get('className')
        },
        {
          name: 'parentClassName',
          message: 'Inherits from:',
          default: this.config.get('parentClassName')
        },
        {
          name: 'headerOnly',
          message: 'Header File only?',
          type: 'confirm',
          default: this.config.get('headerOnly')
        }
      ]
    )
    .then 
    (
      (answers) =>
      {
        
        this.config.set('className', answers['className']) ;
        this.config.set('parentClassName', answers['parentClassName']) ;
        this.config.set('headerOnly', answers['headerOnly']) ;

      }
    ) ;

  }

  configuring ()
  {

    this.config.set('classNameLower', this.config.get('className').toLowerCase()) ;   
  }
  
  default ()
  {
    
  }
  
  writing ()
  {

    this._generateHeader() ;

    if (!this.config.get('headerOnly'))
    {
      this._generateSource() ;
    }

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

  _generateHeader ()
  {

    this.fs.copyTpl
    (
      this.templatePath('include/MyClass.hpp'),
      this.destinationPath('include/' + this.config.get('projectPath') + '/src/' + this.config.get('className') + '.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        className: this.config.get('className'),
        parentClassName: this.config.get('parentClassName'),
      }
    ) ;

  }
  
  _generateSource ()
  {

    this.fs.copyTpl
    (
      this.templatePath('src/MyClass.cpp'),
      this.destinationPath(this.config.get('projectPath') + '/src/' + this.config.get('className') + '.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        className: this.config.get('className'),
        parentClassName: this.config.get('parentClassName'),
      }
    ) ;

  }



} ;