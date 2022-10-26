import "./UI/datagrid.css";
function DataGrid(props) {
  let tabledata = props.data;
  let keys = Object.keys(tabledata[0]);
  return (
    <div className="Grid">
      {tabledata.map((row) => (
        <div
          key={row.id}
          className="row"
          onClick={() => {
            props.click(row);
          }}
        >
          {keys.map((column) => (
            <div className="column" key={column}>
              {row[column]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DataGrid;
