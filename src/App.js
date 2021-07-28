import React,{ Component } from "react";
import './App.css';
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";

class App extends Component {
  //  khởi tạo cóntructer
  constructor(props){
      super(props);
      this.state ={
        tasks:[], //id,nam,status
        isDisplayForm : false,  //hieernt hị form thêm -sửa
        taskEditing: null,
        filter:{
          name :'',
          status: -1
        },
         keyword:'',
        sortBy:'name',
        sortValue :1
      };
  }


  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  } //lưu  localStorage


  // tạo ID
  s4(){
    return Math.floor((1+Math.random()) *  0x10000).toString(16).substring(1); 
   }

   TaoId(){
     return this.s4()+ this.s4()+ '-'+ this.s4()+this.s4()+ this.s4()+ '-'+ this.s4()+this.s4()+ this.s4()+ '-'+ this.s4();
   }



   onToggle =()=>{
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing :null
      }); 
   }//dóng mooer form


   onCloseForm =()=>{
    this.setState({
      isDisplayForm: false
    });
   }
  //  đóng form

   OnShowForm =()=>{
    this.setState({
      isDisplayForm: true
    });
   }  //  hiển thị form

   onSubmit= (data) =>{
     var { tasks}  = this.state;
     if( data.id === ''){
       data.id = this.TaoId();
        tasks.push(data);
     }else{
       var index = this.findIndex(data.id);
       tasks[index]= data;
     }

    this.setState({
      tasks: tasks,
      taskEditing: null
    });

    localStorage.setItem('tasks',JSON.stringify(tasks))
   }

  //  sửa trạng thái/
   onUpdateStatus =(id)=>{
     var { tasks} = this.state;
     var  index= this.findIndex(id);
     if(index !==-1){
       tasks[index].status = !tasks[index].status;
       this.setState({
         tasks: tasks
       });
       localStorage.setItem('tasks',JSON.stringify(tasks));
     }
   }

// tìm id
   findIndex =(id)=>{
     var result= -1;
     var { tasks} = this.state;
     tasks.forEach((task,index) =>{
       if(task.id ===id){
         result = index;
       }
     });
     return result;
   }

//xóa
   onDelete =(id)=>{
    var { tasks} = this.state;
    var  index= this.findIndex(id);
    if(index !==-1){
     tasks.splice(index,1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    this.onCloseForm();
  }
  
  
  // sửa

  onUpdate =(id)=>{
    var { tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing
    });
    this.OnShowForm();

  }
  onFilter =(filterName,filterStatus)=>{
    filterStatus= parseInt(filterStatus,10);
    this.setState({
      filter:{
        name:filterName.toLowerCase(),
        status :filterStatus
      }
    })
  }
  onSearch =(keyword)=>{
    this.setState({
      keyword: keyword
    })
  }
  onSort =(sortBy,sortValue)=>{
    this.setState({
      sortBy:sortBy,
      sortValue: sortValue
    })
    console.log(this.state.sort);

  }

    render() {
        var {tasks,
          isDisplayForm,
           taskEditing,
           filter,
           keyword,
           sortBy,
           sortValue
          
          } = this.state;
        if(filter){
          if(filter.name){
             tasks = tasks.filter((task)=>{
              return task.name.toLowerCase().indexOf(filter.name) !== -1;
            });
          }
            //thèn ẩn --kích hoạt 
            tasks = tasks.filter((task)=>{
             if(filter.status === -1){
               return task;
             }else{
               return task.status ===(filter.status===1 ? true : false) 
             }
           });
         

        }
        if(keyword){
          tasks= tasks.filter((task)=>{
            return task.name.toLowerCase().indexOf(keyword) !== -1;
          });
        }
        if(sortBy ==='name'){
          tasks.sort((a,b)=> {
            if(a.name > b.name) return sortValue;
            else if(a.name < b.name)return -sortValue;
            else return 0;
          });
        }
        else{
          tasks.sort((a,b)=> {
            if(a.status > b.status) return -sortValue;
            else if(a.status < b.status)return sortValue;
            else return 0;
          });
        }
        var elementTaskForm = isDisplayForm
         ? <TaskForm onSubmit = {this.onSubmit} 
                     onCloseForm={this.onCloseForm}
                     task ={taskEditing}/> : '';
      return ( 

        <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm ===true? 'col-sm-4 col-md-4': ''}>
                {elementTaskForm}
            </div>
            <div className={isDisplayForm ===true ? 'col-sm-8 col-md-8': 'col-sm-12 col-md-12'}>
                <button type="button ml-2" 
                className="btn btn-primary mb-3"
                onClick={this.onToggle}
                >
                    <span className="fa fa-plus mr-5" ></span>Thêm Công Việc
                </button>
                
                 <Control 
                 onSearch ={this.onSearch}
                 onSort = {this.onSort}
                 sortBy={sortBy}
                 sortValue={sortValue}
                 />
                <div className="row mt-15 mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList 
                        tasks={tasks}
                        onUpdateStatus = {this.onUpdateStatus}
                        onDelete = {this.onDelete}
                        onUpdate = {this.onUpdate}
                        onFilter ={this.onFilter}
                        ></TaskList>
                    </div>
                </div>
            </div>
        </div> 
    </div>
      );
    }
  }

export default App;
