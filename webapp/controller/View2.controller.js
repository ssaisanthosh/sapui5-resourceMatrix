sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Button",
    "sap/m/Table",
    "sap/m/Column"
  ],
  function(Controller, JSONModel, Button, Table, Column) {
    "use strict";

    return Controller.extend("sai.MatrixTable.controller.View1", {
      onInit: function() {
        this.aMonthL = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        this.aMonthS = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ];
        let oData = [
          {
            sno: "1",
            id: "16-2532713",
            name: "Cris Eyer",
            skill: "SAP ABAP",
            sdate: "02/01/2019",
            edate: "08/01/2019",
            share: "50"
          },
          {
            sno: "2",
            id: "95-3347838",
            name: "Minda Greste",
            skill: "SAP ABAP",
            sdate: "01/01/2020",
            edate: "04/01/2020",
            share: "80"
          },
          {
            sno: "3",
            id: "16-2532713",
            name: "Cris Eyer",
            skill: "SAP ABAP",
            sdate: "07/01/2020",
            edate: "12/01/2020",
            share: "40"
          },
          {
            sno: "4",
            id: "88-1956426",
            name: "Phillida Habbes",
            skill: "SAP Cloud Platform",
            sdate: "01/01/2019",
            edate: "05/01/2019",
            share: "20"
          },
          {
            sno: "5",
            id: "84-6811180",
            name: "Marji Shouler",
            skill: "SAP Cloud Platform",
            sdate: "04/01/2020",
            edate: "08/01/2020",
            share: "75"
          },
          {
            sno: "6",
            id: "88-1956426",
            name: "Phillida Habbes",
            skill: "SAP Cloud Platform",
            sdate: "11/01/2020",
            edate: "12/01/2020",
            share: "100"
          },
          {
            sno: "7",
            id: "84-6811180",
            name: "Marji Shouler",
            skill: "SAP Cloud Platform",
            sdate: "09/01/2019",
            edate: "12/01/2019",
            share: "30"
          },
          {
            sno: "8",
            id: "78-5843508",
            name: "Kimmi Gleader",
            skill: "SAP Fiori",
            sdate: "01/01/2019",
            edate: "03/01/2019",
            share: "50"
          },
          {
            sno: "9",
            id: "60-6344338",
            name: "Joy Grimsdyke",
            skill: "SAP Fiori",
            sdate: "04/01/2019",
            edate: "07/01/2019",
            share: "20"
          },
          {
            sno: "10",
            id: "40-0532142",
            name: "Tracie Goozee",
            skill: "SAP Fiori",
            sdate: "11/01/2019",
            edate: "03/01/2020",
            share: "75"
          },
          {
            sno: "11",
            id: "78-5843508",
            name: "Kimmi Gleader",
            skill: "SAP Fiori",
            sdate: "08/01/2020",
            edate: "12/01/2020",
            share: "100"
          },
          {
            sno: "12",
            id: "58-7339524",
            name: "Larissa Errett",
            skill: "SAP HANA",
            sdate: "02/01/2019",
            edate: "06/01/2019",
            share: "35"
          },
          {
            sno: "13",
            id: "96-6823142",
            name: "Kayla Giacubbo",
            skill: "SAP HANA",
            sdate: "11/01/2019",
            edate: "07/01/2020",
            share: "30"
          },
          {
            sno: "14",
            id: "88-7107001",
            name: "Hannie MacKissack",
            skill: "SAP UI5",
            sdate: "05/01/2019",
            edate: "11/01/2019",
            share: "40"
          },
          {
            sno: "15",
            id: "16-2532713",
            name: "Cris Eyer",
            skill: "SAP UI5",
            sdate: "12/01/2019",
            edate: "04/01/2020",
            share: "65"
          },
          {
            sno: "16",
            id: "88-1956426",
            name: "Phillida Habbes",
            skill: "SAP UI5",
            sdate: "06/01/2020",
            edate: "09/01/2020",
            share: "35"
          },
          {
            sno: "17",
            id: "84-6811180",
            name: "Marji Shouler",
            skill: "SAP UI5",
            sdate: "11/01/2020",
            edate: "12/01/2020",
            share: "100"
          }
        ];

        let groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          },
          groubedBySkill = groupBy(oData, "skill"),
          oaData = this._groupBy(groubedBySkill, "skill", "name"),
          oTable = this.getView().byId("table1"),
          oControl = "",
          oColumn = "";

        oTable.setSelectionMode(sap.ui.table.SelectionMode.None);
        oColumn = this._createColumn(
          oControl,
          "text",
          "sno",
          "S.No",
          "50px",
          oTable
        );
        oColumn = this._createColumn(
          oControl,
          "text",
          "skill",
          "Skill",
          "300px",
          oTable
        );
        oColumn = this._createColumn(
          oControl,
          "text",
          "name",
          "Resource",
          "300px",
          oTable
        );

        let diffDate = this._getDiffYear(oData, "sdate", "edate");
        this._buildRows(oaData, diffDate, oControl, oTable);

        oTable.setFixedColumnCount(3);

        let oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({
          modelData: oaData
        });

        oTable.setModel(oModel);
        oTable.bindRows("/modelData");

        // var oModel1 = new sap.ui.model.json.JSONModel();
        // oModel1.setData({
        // 	table: oData
        // });
        // this.getView().setModel(oModel1);
      },

      _buildRows: function(a, b, c, f) {
        let _a = this.getLowestDateYear;
        for (let i = 0; i <= b; i++) {
          let _b = new Date("01/01/" + b);
          for (let y = 0; y < this.aMonthL.length; y++) {
            let _c = _b,
              _e = "M" + parseInt(_c.getMonth()) + "_" + _c.getFullYear();
            this._createColumnInput(
              c,
              "text",
              "sno",
              this.aMonthS[y],
              "50px",
              f,
              _a,
              _e
            );
          }
          _a++;
        }
      },
      /**
       *
       * @param {*} a Column
       * @param {*} b BindingProperty Type
       * @param {*} c BindingProperty Key
       * @param {*} d Column Label Value
       * @param {*} e Column Width
       * @param {*} f Table
       * @param {*} g Primary Label
       * @param {*} h Primary Key
       */
      _createColumnInput: function(a, b, c, d, e, f, g, h) {
        a = new sap.ui.commons.TextView().bindProperty("text", h);
        a = new sap.m.Input({
          type: sap.m.InputType.Number,
          maxLength: 2
        }).bindProperty("value", h);

        a = new sap.ui.commons.TextView().bindProperty(b, c);
        var _a = new sap.ui.table.Column({
          multiLabels: [
            [
              new sap.m.Label({
                text: g
              }),
              new sap.m.Label({
                text: d
              })
            ]
          ],
          template: a,
          headerSpan: [12, 1],
          autoResizable: false,
          width: e
        });
        f.addColumn(_a, {
          autoResizable: false
        });
      },

      _getDiffYear: function(a, b, c) {
        var _a = a.map(function(v) {
            return new Date(v[b]);
          }),
          _b = a.map(function(v) {
            return new Date(v[c]);
          });

        _a.sort(function(x, y) {
          return x.getTime() - y.getTime();
        });
        _b.sort(function(u, v) {
          return u.getTime() - v.getTime();
        });

        var _e = _a[0],
          _f = _b[_b.length - 1],
          _g = new Date(_e).getFullYear(),
          _h = new Date(_f).getFullYear();
        this.getLowestDateYear = new Date(_e).getFullYear();
        return _h - _g;
      },

      _groupRowsChild: function(a, b, c, d) {
        $.each(a, function(_i, _v) {
          let _a = d[_v.name];
          let _f = 0;
          $.each(_a, function(_x, _y) {
            let _b =
              new Date(_y.edate).getMonth() - new Date(_y.sdate).getMonth();
            _b = _b < 0 ? 12 + _b : _b;
            let _d = new Date(y.sdate);
            let _e = d;
            _b = _f + _b;
            for (let _c = _f; _c <= _b; _c++) {
              v["M" + parseInt(_e.getMonth()) + "_" + _e.getFullYear()] =
                _y.share;
              _e = new Date(_d.setMonth(d.getMonth() + 1));
            }
            _f = _b;
          });
        });
      },

      _groupRows: function(a, b, c) {
        var _c = [],
          _d = 1;
        $.each(a, function(_i, _v) {
          _c.push({
            sno: _d,
            [b]: _i
          });
          _d++;
        });
        return _c;
      },
      _groupBy: function(a, b, c) {
        var _c = [],
          _d = 1;
        $.each(a, function(_i, _v) {
          var _e = {};
          if (c !== undefined) {
            $.each(_v, function(_x, _y) {
              _e = {};
              _e["sno"] = _d;
              _e[b] = _i;
              _e[c] = _y[c];
              _c.push(_e);
              _d++;
            });
          } else {
            _e = {};
            _e["sno"] = _d;
            _e[b] = _i;
            _c.push(_e);
            _d++;
          }
        });
        return _c;
      },

      _createColumn: function(a, b, c, d, e, f) {
        a = new sap.ui.commons.TextView().bindProperty(b, c);
        var _a = new sap.ui.table.Column({
          multiLabels: [
            new sap.m.Label({
              text: d
            })
          ],
          template: a,
          autoResizable: false,
          width: e
        });
        return f.addColumn(_a, {
          autoResizable: false
        });
      }
    });
  }
);
