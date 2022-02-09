import {
  Component, ViewChild
} from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import {
  ColDef
} from "ag-grid-community";

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  colDef: ColDef[] = [{
      headerName: "Make",
      field: "make",
      rowGroup: true
    },
    {
      headerName: "Price",
      field: "price",
      sortable: true,
      filter: true
    }
  ];

  autoGroupColumnDef: ColDef = {
    headerName: "Model",
    field: "model",
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true
    }
  }

  rowData = [{
      make: 'Toyota',
      model: 't1',
      price: 10
    },
    {
      make: 'Honda',
      model: 'h1',
      price: 20
    },
    {
      make: 'Nissan',
      model: 'n1',
      price: 30
    },
    {
      make: 'Toyota',
      model: 't1',
      price: 10
    },
    {
      make: 'Honda',
      model: 'h1',
      price: 20
    },
    {
      make: 'Nissan',
      model: 'n1',
      price: 30
    },
    {
      make: 'Toyota',
      model: 't1',
      price: 10
    },
    {
      make: 'Honda',
      model: 'h1',
      price: 20
    },
    {
      make: 'Nissan',
      model: 'n1',
      price: 30
    },
    {
      make: 'Toyota',
      model: 't1',
      price: 10
    },
    {
      make: 'Honda',
      model: 'h1',
      price: 20
    },
    {
      make: 'Nissan',
      model: 'n1',
      price: 30
    }
  ];


  getSelectedRows(): void{
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node=>node.data);
    const representation = selectedData.map(entry => entry.make + ' ' + entry.model). join(', ');

    console.log(representation)

  }
}
