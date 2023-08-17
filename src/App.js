import React, { useState, useRef, useEffect} from 'react';
import Table from 'react-bootstrap/Table';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './App.css';
import { useMouse } from './hooks/useMouse';
import { ContenedorInsert, ItemsArrastred } from './components/headerTable';
import { DetectedPosition } from './components/detectedposition';
import MaterialReactTable from 'material-react-table';


export const App = () => {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
  const useRefContainer = useRef(); // captura las caracteristicas del contenedor hijo
  // Each Column Definition results in one Column.
  const [isSalio,setIsSalio] = useState(false);
  const position = useMouse();
  const [listGroupData, setlistGroupData] = useState({});
  const [columnKey, setColumKey] = useState(null);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'make'
    },
    {
      field: 'model'
    },
    {
      field: 'price'
    }
  ]);
  const [listColumsData, setListColumnsData] = useState([
    {
      header: 'make',
      accessorKey: 'make',
      enableGrouping: false, //do not let this column be grouped
    },
    {
      header: 'model',
      accessorKey: 'model',
    },
    {
      header: 'price',
      accessorKey: 'price',
    }
  ])
  const [columnSelected, setcolumnSelected] = useState([]);
  useEffect(() => {
    (()=>{
      fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData)
      });
      const divColum = document.getElementsByClassName("ag-header-cell");
      for (let index = 0; index < divColum.length; index++) {
        const element = divColum[index];
        element.addEventListener('click',(event)=>{
          console.log(event)
        })
      }
    })();
  }, []);

  // Example using Grid's API
  // const buttonListener = useCallback( e => {
  //   gridRef.current.api.deselectAll();
  // }, []);

  const onSelected = (key) => {
    setColumKey({
      field: key
    })
  }

  const onSolted = (key) => {
    const Rect = useRefContainer.current.getBoundingClientRect()
    const sizeChildrem = {
        size:{
            width: Rect.width, 
            height: Rect.height
        },
        position:{
            x: Rect.x, 
            y: Rect.y
        }
    }
    console.log(position)
    if ((sizeChildrem.position.x <= position.x) && (position.x <= (sizeChildrem.position.x + sizeChildrem.size.width))){
      // se ingresa el nuevo dato a realizar el group by
      if (columnKey == null) return 
        const listSelected = [...columnSelected];
        const comprobarInsert = listSelected.filter((item)=>{
            return item.field == columnKey.field
        })
      console.log(comprobarInsert)
      if(comprobarInsert.length <= 0){
        listSelected.push(columnKey)
        setcolumnSelected(listSelected)
      }
      return;
    }
    setColumKey(null)
  }

  return (
    <div className='contenedorBasico' >

      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div style={{backgroundColor: 'blue', width: '500px', height: '30px'}}>
        {/* <DetectedPosition 
          onMouseMoveCapture = {()=>{
           
          }} 
          onMouseLeave = {()=>{console.log('Saliendo')}} 
        >
          
        </DetectedPosition> */}
        <div ref={useRefContainer} className='content-chip-information-data' style={{backgroundColor: 'transparent'}}  >
              {columnSelected.map((item)=>{
                // CADA CHIP presenta un boton de eliminacion
                return (<div className='chip-information-data'>{item.field}<div onClick={()=>{
                  const comprobarInsert = columnSelected.filter((itemD)=>{
                    return itemD.field != item.field
                  })
                  setcolumnSelected(comprobarInsert)
                }} className='close'>X</div></div>)
              })}
          </div>
      </div>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{width: 500, height: 500}} >
      {(columnSelected.length == 0)?<Table striped bordered hover style={{backgroundColor: 'white', width: '100%'}}>
        <HeaderTable columnDefs={columnDefs} onSelected = {onSelected} onSolted = {onSolted} />
        {rowData.map((item,ind)=>{
            // console.log(item)
            return (<tr>
              <td style={{textAlign:'center'}}>{ind + 1}</td>
              <td style={{textAlign:'center'}}>{item.make}</td>
              <td style={{textAlign:'center'}}>{item.model}</td>
              <td style={{textAlign:'center'}}>{item.price}</td>
            </tr>);
          }).filter((int,ind)=> ind < 15)}
      </Table>:
      // en caso que aiga una agrupacion de datos
      <div className='container-group-content'>
        <Table striped bordered hover style={{backgroundColor: 'white', width: '100%'}}>
          <HeaderTable columnDefs={columnDefs} onSelected = {onSelected} onSolted = {onSolted} />
        </Table>
        <MaterialReactTable
          columns={listColumsData}
          data={rowData}
          enableColumnResizing
          enableGrouping
          enableStickyHeader
          enableStickyFooter
          initialState={{
            density: 'compact',
            expanded: true, //expand all groups by default
            grouping: columnSelected.map((item)=> item.field), //an array of columns to group by by default (can be multiple)
            pagination: { pageIndex: 0, pageSize: 20 },
            // sorting: [{ id: 'state', desc: false }], //sort by state by default
          }}
          muiToolbarAlertBannerChipProps={{ color: 'primary' }}
          muiTableContainerProps={{ sx: { maxHeight: 700 } }}
        />
      </div>}
      
      </div>
    </div>
  );
};


const InteracItemHeader = (props) => {

  const {labelCol, onSelected = ()=>{}, onSolted = ()=>{}} = props;

  return (<th className='Interac-Item-Header'>
    <ItemsArrastred 
        onSelectedItem = {() => {
          onSelected(labelCol);
        }}
        onSoltarItem = {() => {
          onSolted(labelCol)
        }}
        contentArrastred ={<ContenedorInsert labelH={labelCol} />  }
    >
        <div className='text-selection-disable' >{labelCol}</div>
    </ItemsArrastred>
  </th>);
}

const HeaderTable = (props) => {

  const {
    columnDefs = [],
    onSelected = (key) => {},
    onSolted = (key) => {}
  } = props;



  return (<thead>
    <tr>
      <th>#</th>
      {columnDefs.map((item)=>{
        return (<InteracItemHeader labelCol = {item.field} onSelected = {onSelected} onSolted = {onSolted} />);
      })}
    </tr>
  </thead>);
}