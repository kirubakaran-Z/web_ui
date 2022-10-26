import DataGrid from "./datagrid";

function UserTable() {
  let sample = [
    { id: 1, name: "kiru", email: "kiru email" },
    { id: 2, name: "dheer", email: "dheer mail" },
    { id: 3, name: "cetan", email: "chetan email" },
  ];
  return (
    <div>
      <DataGrid data={sample} click={() => {}}></DataGrid>
    </div>
  );
}

export default UserTable;
