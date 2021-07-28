import React,{Component } from "react";

class Sort extends Component {



    onClick = (sortBy,sortValue)=>{
       
  
        this.props.onSort(sortBy,sortValue);
       
    }
    render() {
        // var {sort} = this.state;
      return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li  onClick = {()=> this.onClick('name',1)}>
                    <a role="button" >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span><i className={(this.props.sortBy ==='name' && this.props.sortValue===1) ? 'fa fa-check' : ''}></i>
                            </a>
                          
                </li>
                <li onClick={()=> this.onClick('name',-1)}>
                    <a role="button">
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                                </span><i className={(this.props.sortBy ==='name' && this.props.sortValue=== -1) ? 'fa fa-check' : ''}></i>
                            </a>
                </li>
                <li role="separator" className="divider"></li>
                <li onClick={()=> this.onClick('status',1)}><a role="button">Trạng Thái Kích Hoạt</a><i className={(this.props.sortBy ==='status' && this.props.sortValue===1) ? 'fa fa-check' : ''}></i></li>
                <li onClick={()=> this.onClick('status',-1)}><a role="button">Trạng Thái Ẩn </a><i className={(this.props.sortBy ==='status' && this.props.sortValue=== -1) ? 'fa fa-check' : ''}></i></li>
            </ul>
        </div>
    </div>
      );
    }
  }

export default Sort;
