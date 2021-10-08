import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
} from '@angular/core';
import { sampleData } from './jsontreegriddata';
import {
  SortService,
  ResizeService,
  PageService,
  EditService,
  ExcelExportService,
  PdfExportService,
  ContextMenuService,
  ToolbarService,
  ColumnChooserService,
  TreeGridComponent,
  RowDDService,
  SelectionService,
  FilterService,
  EditSettingsModel,
  FreezeService,
} from '@syncfusion/ej2-angular-treegrid';

import { SortEventArgs, freezeDirection, Column } from '@syncfusion/ej2-grids';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import {
  DialogComponent,
  ButtonPropsModel,
} from '@syncfusion/ej2-angular-popups';
import {
  DropDownList,
  ChangeEventArgs,
} from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [
    SortService,
    ResizeService,
    PageService,
    EditService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
    ToolbarService,
    ColumnChooserService,
    FilterService,
    FreezeService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public data: Object[] = [];
  public pageSettings: Object;
  public contextMenuItems: string[] = [];
  public editing: EditSettingsModel;
  public toolbar: string[];
  public editparams: Object;
  public sortSettings: Object;
  public selectOptions: Object;
  public filterSettings: Object;
  public templateOptions: object;
  public dropDownFilter: DropDownList;
  public d1data: Object;
  public fields1: Object;
  public selectionSettings: object;

  // variables for add, edit and delete
  public editSettings: Object;
  //   public crudbar: string[];
  public taskidrules: Object;
  public tasknamerules: Object;
  public startdaterules: Object;
  public durationrules: Object;
  public enddaterules: Object;
  public progressrules: Object;
  public priorityrules: Object;
  public edit: Object;
  public cruddata: Object;
  public crudfields: Object;

  // Variables Initialization for Data formatting
  public dM1data: Object;
  public ddlfields: Object;
  public dM2data: any;
  public dM3data: any;
  public format: Object;
  public fieldsM: Object;

  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;
  @ViewChild('columndropdown')
  public columnDropDown: DropDownListComponent;
  @ViewChild('directiondropdown')
  public directionDropDown: DropDownListComponent;
  @ViewChild('alertDialog')
  public alertDialog: DialogComponent;
  @ViewChild('taskID')
  public taskID: CheckBoxComponent;
  @ViewChild('taskName')
  public taskName: CheckBoxComponent;
  @ViewChild('startDate')
  public startDate: CheckBoxComponent;
  @ViewChild('endDate')
  public endDate: CheckBoxComponent;
  @ViewChild('duration')
  public duration: CheckBoxComponent;
  @ViewChild('progress')
  public progress: CheckBoxComponent;
  @ViewChild('priority')
  public priority: CheckBoxComponent;

  @ViewChild('dropdown1')
  public dropdown1: DropDownListComponent;

  @ViewChild('dropdownS')
  public dropdownS: DropDownListComponent;

  @ViewChild('dropdown2')
  public dropdown2: DropDownListComponent;

  @ViewChild('dropdown3')
  public dropdown3: DropDownListComponent;

  @ViewChild('dropdownM1')
  public dropdownM1: DropDownListComponent;
  @ViewChild('dropdownM2')
  public dropdownM2: DropDownListComponent;

  // initializing variables for frozen
  public visible: boolean = false;
  public fields: object = { text: 'name', value: 'id' };
  public animationSettings: object = { effect: 'None' };
  public content: string = 'Atleast one Column should be in movable';
  public header: string = 'Frozen';
  public showCloseIcon: boolean = false;
  public target: string = '.control-section';
  public width: string = '300px';
  public data: Object[] = [];
  public refresh: boolean = true;
  public columnData: Object[] = [
    { id: 'taskID', name: 'Task ID' },
    { id: 'taskName', name: 'TaskName' },
    { id: 'startDate', name: 'Start Date' },
    { id: 'endDate', name: 'End Date' },
    { id: 'duration', name: 'Duration' },
    { id: 'progress', name: 'Progress' },
    { id: 'priority', name: 'Priority' },
  ];
  public directionData: Object[] = [
    { id: 'Left', name: 'Left' },
    { id: 'Right', name: 'Right' },
    { id: 'Center', name: 'Center' },
  ];

  public contextMenus: Object;

  ngOnInit(): void {
    //Storing data
    this.data = sampleData;
    this.selectOptions = { type: 'Multiple' };
    //Setting sorting default value
    this.sortSettings = {
      columns: [
        { field: 'taskID', direction: 'Ascending' },
        { field: 'taskName', direction: 'Ascending' },
      ],
    };

    // Intialization for multiselct
    this.selectionSettings = { type: 'Multiple' };
    this.fields1 = { text: 'type', value: 'id' };
    (this.d1data = [
      { id: 'Single', type: 'Single' },
      { id: 'Multiple', type: 'Multiple' },
    ]),
      (this.fields2 = { text: 'mode', value: 'id' });
    (this.d2data = [
      { id: 'Row', mode: 'Row' },
      { id: 'Cell', mode: 'Cell' },
    ]),
      (this.fields3 = { text: 'mode', value: 'id' });
    this.d3data = [
      { id: 'Flow', mode: 'Flow' },
      { id: 'Box', mode: 'Box' },
    ];

    this.contextMenus = [
      { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
      { text: 'Expand the Row', target: '.e-content', id: 'expandrow' },
      { text: 'Collapse All', target: '.e-headercontent', id: 'collapseall' },
      { text: 'Expand All', target: '.e-headercontent', id: 'expandall' },
    ];

    this.format = { format: 'M/d/yyyy', type: 'date' };
    (this.pageSettings = { pageCount: 5 }),
      (this.ddlfields = { text: 'name', value: 'id' });
    (this.dM1data = [
      { id: 'taskName', name: 'Task Name' },
      { id: 'startDate', name: 'Start Date' },
    ]),
      (this.dM2data = [
        { id: 'n2', format: 'n2' },
        { id: 'n3', format: 'n3' },
        { id: 'c2', format: 'c2' },
        { id: 'c3', format: 'c3' },
        { id: 'p2', format: 'p2' },
        { id: 'p3', format: 'p3' },
      ]),
      (this.dM3data = [
        { id: 'M/d/yyyy', format: 'Short Date' },
        { id: 'dddd, MMMM dd, yyyy', format: 'Long Date' },
        { id: 'MMMM, yyyy', format: 'Month/Year' },
        { id: 'MMMM, dd', format: 'Month/Day' },
      ]),
      (this.fieldsM = { text: 'format', value: 'id' });

    // Setting filter default value
    this.pageSettings = { pageSize: 10 };
    this.filterSettings = {
      type: 'FilterBar',
      hierarchyMode: 'Parent',
      mode: 'Immediate',
    };
    this.templateOptions = {
      create: (args: { element: Element }) => {
        let dd: HTMLInputElement = document.createElement('input');
        dd.id = 'duration';
        return dd;
      },
      write: (args: { element: Element }) => {
        let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
        this.dropDownFilter = new DropDownList({
          dataSource: dataSource,
          value: 'All',
          change: (e: ChangeEventArgs) => {
            let valuenum: any = +e.value;
            let id: any = <string>this.dropDownFilter.element.id;
            let value: any = <string>e.value;
            if (value !== 'All') {
              this.treegrid.filterByColumn(id, 'equal', valuenum);
            } else {
              this.treegrid.removeFilteredColsByField(id);
            }
          },
        });
        this.dropDownFilter.appendTo('#duration');
      },
    };
    this.fields1 = { text: 'mode', value: 'id' };
    this.d1data = [
      { id: 'Parent', mode: 'Parent' },
      { id: 'Child', mode: 'Child' },
      { id: 'Both', mode: 'Both' },
      { id: 'None', mode: 'None' },
    ];

    // initializations for CRUD operations
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Cell', // Mode will dialog for Dialog Editing
    };
    this.toolbar = ['Add', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
    this.taskidrules = { required: true, number: true };
    this.progressrules = { required: true, number: true };
    this.tasknamerules = { required: true };
    this.priorityrules = { required: true };
    this.startdaterules = { date: true };
    this.enddaterules = { date: true };
    this.durationrules = { number: true, min: 0 };
    this.edit = { params: { format: 'n' } };
    this.crudfields = { text: 'name', value: 'id' };

    this.cruddata = [
      { id: 'CellEditing', name: 'Cell Editing' },
      { id: 'RowEditing', name: 'Row Editing' },
    ];

    // Common features
    this.contextMenuItems = [
      'AutoFit',
      'AutoFitAll',
      'SortAscending',
      'SortDescending',
      'Edit',
      'Delete',
      'Save',
      'Cancel',
      'PdfExport',
      'ExcelExport',
      'CsvExport',
      'FirstPage',
      'PrevPage',
      'LastPage',
      'NextPage',
    ];
    this.editing = { allowDeleting: true, allowEditing: true, mode: 'Row' };
    this.pageSettings = { pageSize: 10 };
    this.editparams = { params: { format: 'n' } };
    this.toolbar = ['ColumnChooser'];
  }

  // Change event for changing mode for filtering data
  modeChange(e: ChangeEventArgs): void {
    let mode: any = <string>e.value;
    this.treegrid.filterSettings.hierarchyMode = mode;
    this.treegrid.clearFiltering();
    this.dropDownFilter.value = 'All';
  }

  // Function for sorting Task Id on click event
  public taskIDSort(e: MouseEvent): void {
    if (this.taskID.checked) {
      this.treegrid.sortByColumn('taskID', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('taskID');
    }
  }

  // Function for sorting Task name on click event
  public taskNameSort(e: MouseEvent): void {
    if (this.taskName.checked) {
      this.treegrid.sortByColumn('taskName', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('taskName');
    }
  }

  // Function for sorting Start date on click event
  public startDateSort(e: MouseEvent): void {
    if (this.taskName.checked) {
      this.treegrid.sortByColumn('startDate', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('startDate');
    }
  }

  // Function for sorting End date on click event
  public endDateSort(e: MouseEvent): void {
    if (this.taskName.checked) {
      this.treegrid.sortByColumn('endDate', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('endDate');
    }
  }

  // Function for sorting duration on click event
  public durationSort(e: MouseEvent): void {
    if (this.taskName.checked) {
      this.treegrid.sortByColumn('duration', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('duration');
    }
  }

  // Function for sorting progress on click event
  public progressSort(e: MouseEvent): void {
    if (this.taskName.checked) {
      this.treegrid.sortByColumn('progress', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('progress');
    }
  }

  // Function for sorting priority on click event
  public prioritySort(e: MouseEvent): void {
    if (this.taskName.checked) {
      this.treegrid.sortByColumn('priority', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('priority');
    }
  }

  // Common sort function for all sorting
  public sort(args: SortEventArgs): void {
    if (args.requestType === 'sorting') {
      for (let columns of this.treegrid.getColumns()) {
        for (let sortcolumns of this.treegrid.sortSettings.columns) {
          if (sortcolumns.field === columns.field) {
            this.check(sortcolumns.field, true);
            break;
          } else {
            this.check(columns.field, false);
          }
        }
      }
    }
  }

  // To check which column is selected for sorting
  public check(field: string, state: boolean): void {
    switch (field) {
      case 'taskID':
        this.taskID.checked = state;
        break;
      case 'taskName':
        this.taskName.checked = state;
        break;
      case 'startDate':
        this.startDate.checked = state;
        break;
      case 'endDate':
        this.endDate.checked = state;
        break;
      case 'duration':
        this.duration.checked = state;
      case 'progress':
        this.progress.checked = state;
      case 'priority':
        this.priority.checked = state;
        break;
    }
  }

  // function to Row level or Cell level CRUD Operations
  public onCrudDDChange(e: ChangeEventArgs): void {
    if (e.value === 'CellEditing') {
      this.treegrid.editSettings.mode = 'Cell';
      this.treegrid.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
    } else {
      this.treegrid.editSettings.mode = 'Row';
      this.treegrid.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    }
  }

  // Column change function
  public columnChange(e: ChangeEventArgs): void {
    let columnName: string = e.value as string;
    let column: Column = this.treegrid.grid.getColumnByField(columnName);
    let value: string = column.freeze === undefined ? 'Center' : column.freeze;
    this.refresh = this.directionDropDown.value === value;
    this.directionDropDown.value = value;
  }

  // function for changing direction for freezing
  public directionChange(e: ChangeEventArgs): void {
    if (this.refresh) {
      let columnName: string = this.columnDropDown.value as string;
      let mvblColumns: Column[] = this.treegrid.grid.getMovableColumns();
      if (
        mvblColumns.length === 1 &&
        columnName === mvblColumns[0].field &&
        e.value !== mvblColumns[0].freeze
      ) {
        this.alertDialog.show();
        this.refresh = false;
        this.directionDropDown.value = 'Center';
        this.directionDropDown.refresh();
      } else {
        this.treegrid.grid.getColumnByField(columnName).freeze =
          e.value === 'Center' ? undefined : (e.value as freezeDirection);
        this.treegrid.refreshColumns();
      }
    }
    this.refresh = true;
  }

  public alertDialogBtnClick = (): void => {
    this.alertDialog.hide();
  };

  public dlgButtons: ButtonPropsModel[] = [
    {
      click: this.alertDialogBtnClick.bind(this),
      buttonModel: { content: 'OK', isPrimary: true },
    },
  ];

  // Right click open menutiem FunctionS
  contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
    let elem: Element = arg.event.target as Element;
    let row: Element = elem.closest('.e-row');
    let uid: string = row && row.getAttribute('data-uid');
    let items: Array<HTMLElement> = [].slice.call(
      document.querySelectorAll('.e-menu-item')
    );
    for (let i: number = 0; i < items.length; i++) {
      items[i].setAttribute('style', 'display: none;');
    }
    if (elem.closest('.e-row')) {
      if (
        isNullOrUndefined(uid) ||
        isNullOrUndefined(
          getValue(
            'hasChildRecords',
            this.treegrid.grid.getRowObjectFromUID(uid).data
          )
        )
      ) {
        arg.cancel = true;
      } else {
        let flag: boolean = getValue(
          'expanded',
          this.treegrid.grid.getRowObjectFromUID(uid).data
        );
        let val: string = flag ? 'none' : 'block';
        document
          .querySelectorAll('li#expandrow')[0]
          .setAttribute('style', 'display: ' + val + ';');
        val = !flag ? 'none' : 'block';
        document
          .querySelectorAll('li#collapserow')[0]
          .setAttribute('style', 'display: ' + val + ';');
      }
    } else {
      let len =
        this.treegrid.element.querySelectorAll('.e-treegridexpand').length;
      if (len !== 0) {
        document
          .querySelectorAll('li#collapseall')[0]
          .setAttribute('style', 'display: block;');
      } else {
        document
          .querySelectorAll('li#expandall')[0]
          .setAttribute('style', 'display: block;');
      }
    }
  }
  contextMenuClick(args?: MenuEventArgs): void {
    if (args.item.id === 'collapserow') {
      this.treegrid.collapseRow(
        this.treegrid.getSelectedRows()[0] as HTMLTableRowElement,
        this.treegrid.getSelectedRecords()[0]
      );
    } else if (args.item.id === 'expandrow') {
      this.treegrid.expandRow(
        this.treegrid.getSelectedRows()[0] as HTMLTableRowElement,
        this.treegrid.getSelectedRecords()[0]
      );
    } else if (args.item.id === 'collapseall') {
      this.treegrid.collapseAll();
    } else if (args.item.id === 'expandall') {
      this.treegrid.expandAll();
    }
  }

  // functions for data formatting
  public onChange(e: ChangeEventArgs): void {
    let columnName: string = <string>e.value;
    console.log(columnName);
    if (columnName === 'taskName') {
      this.dropdownM2.dataSource = this.dM2data;
      this.dropdownM2.value = 'n2';
    }
    if (columnName === 'startDate') {
      this.dropdownM2.dataSource = this.dM3data;
      this.dropdownM2.value = 'M/d/yyyy';
    }
    //  this.dropdown2.index = 0;
  }
  public change(e: ChangeEventArgs): void {
    let formatval: any = <string>e.value;
    let columnName: string = <string>this.dropdownM1.value;
    if (columnName === 'taskName') {
      this.treegrid.getColumnByField(columnName).format = formatval;
    }
    if (columnName === 'orderDate') {
      this.treegrid.getColumnByField(columnName).format = {
        format: formatval,
        type: 'date',
      };
    }
    this.treegrid.refreshColumns();
  }
}
