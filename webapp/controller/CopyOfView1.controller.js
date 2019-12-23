sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	"sap/m/Button",
	"sap/m/Table",
	"sap/m/Column"
], function(Controller, JSONModel, Button, Table, Column) {
	"use strict";

	return Controller.extend("sai.MatrixTable.controller.View1", {
		onInit: function() {

			var oData = [{
				"sno": "1",
				"id": "16-2532713",
				"name": "Cris Eyer",
				"skill": "SAP ABAP",
				"sdate": "02/01/2019",
				"edate": "08/01/2019",
				"share": "50"
			}, {
				"sno": "2",
				"id": "95-3347838",
				"name": "Minda Greste",
				"skill": "SAP ABAP",
				"sdate": "01/01/2020",
				"edate": "04/01/2020",
				"share": "80"
			}, {
				"sno": "3",
				"id": "16-2532713",
				"name": "Cris Eyer",
				"skill": "SAP ABAP",
				"sdate": "07/01/2020",
				"edate": "12/01/2020",
				"share": "40"
			}, {
				"sno": "4",
				"id": "88-1956426",
				"name": "Phillida Habbes",
				"skill": "SAP Cloud Platform",
				"sdate": "01/01/2019",
				"edate": "05/01/2019",
				"share": "20"
			}, {
				"sno": "5",
				"id": "84-6811180",
				"name": "Marji Shouler",
				"skill": "SAP Cloud Platform",
				"sdate": "04/01/2020",
				"edate": "08/01/2020",
				"share": "75"
			}, {
				"sno": "6",
				"id": "88-1956426",
				"name": "Phillida Habbes",
				"skill": "SAP Cloud Platform",
				"sdate": "11/01/2020",
				"edate": "12/01/2020",
				"share": "100"
			}, {
				"sno": "7",
				"id": "84-6811180",
				"name": "Marji Shouler",
				"skill": "SAP Cloud Platform",
				"sdate": "09/01/2019",
				"edate": "12/01/2019",
				"share": "30"
			}, {
				"sno": "8",
				"id": "78-5843508",
				"name": "Kimmi Gleader",
				"skill": "SAP Fiori",
				"sdate": "01/01/2019",
				"edate": "03/01/2019",
				"share": "50"
			}, {
				"sno": "9",
				"id": "60-6344338",
				"name": "Joy Grimsdyke",
				"skill": "SAP Fiori",
				"sdate": "04/01/2019",
				"edate": "07/01/2019",
				"share": "20"
			}, {
				"sno": "10",
				"id": "40-0532142",
				"name": "Tracie Goozee",
				"skill": "SAP Fiori",
				"sdate": "11/01/2019",
				"edate": "03/01/2020",
				"share": "75"
			}, {
				"sno": "11",
				"id": "78-5843508",
				"name": "Kimmi Gleader",
				"skill": "SAP Fiori",
				"sdate": "08/01/2020",
				"edate": "12/01/2020",
				"share": "100"
			}, {
				"sno": "12",
				"id": "58-7339524",
				"name": "Larissa Errett",
				"skill": "SAP HANA",
				"sdate": "02/01/2019",
				"edate": "06/01/2019",
				"share": "35"
			}, {
				"sno": "13",
				"id": "96-6823142",
				"name": "Kayla Giacubbo",
				"skill": "SAP HANA",
				"sdate": "11/01/2019",
				"edate": "07/01/2020",
				"share": "30"
			}, {
				"sno": "14",
				"id": "88-7107001",
				"name": "Hannie MacKissack",
				"skill": "SAP UI5",
				"sdate": "05/01/2019",
				"edate": "11/01/2019",
				"share": "40"
			}, {
				"sno": "15",
				"id": "16-2532713",
				"name": "Cris Eyer",
				"skill": "SAP UI5",
				"sdate": "12/01/2019",
				"edate": "04/01/2020",
				"share": "65"
			}, {
				"sno": "16",
				"id": "88-1956426",
				"name": "Phillida Habbes",
				"skill": "SAP UI5",
				"sdate": "06/01/2020",
				"edate": "09/01/2020",
				"share": "35"
			}, {
				"sno": "17",
				"id": "84-6811180",
				"name": "Marji Shouler",
				"skill": "SAP UI5",
				"sdate": "11/01/2020",
				"edate": "12/01/2020",
				"share": "100"
			}];

			var dateArr = oData.map(function(v) {
				return new Date(v.sdate);
			});
			var dateArr1 = oData.map(function(v) {
				return new Date(v.edate);
			});
			dateArr1.sort(function(a, b) {
				return a.getTime() - b.getTime();
			});
			dateArr.sort(function(a, b) {
				return a.getTime() - b.getTime();
			});

			var lowestDate = dateArr[0];
			var highestDate = dateArr1[dateArr1.length - 1];
			var sdate_year = new Date(lowestDate).getFullYear();
			var edate_year = new Date(highestDate).getFullYear();
			var diff_year = edate_year - sdate_year;

			var groupBy = function(xs, key) {
				return xs.reduce(function(rv, x) {
					(rv[x[key]] = rv[x[key]] || []).push(x);
					return rv;
				}, {});
			};
			// var groubedByTeam = groupBy(oData, 'id');
			var groubedByResource = groupBy(oData, 'name');
			var groubedByTeam = groupBy(oData, 'skill');

			var oaData = [],
				a = 1;
			$.each(groubedByTeam, function(i, v) {
				oaData.push({
					sno: a,
					skill: i
				});
				a++;
			});

			var oTable = this.getView().byId("table1");
			oTable.setSelectionMode(sap.ui.table.SelectionMode.None);

			var oControl = "",
				oColumn = "";
			oColumn = this._createColumn(oControl, "text", "sno", "S.No", "50px", oTable);
			oColumn = this._createColumn(oControl, "text", "skill", "Skill", "300px", oTable);
			oColumn = this._createColumn(oControl, "text", "name", "Resource", "300px", oTable);
			
			let oMultiLabel = [],
				xdate = sdate_year;
			var aMonthL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
				'December'
			];
			var aMonthS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

			$.each(oaData, function(i, v) {
				let a = groubedByTeam[v.skill];
				let f = 0;
				$.each(a, function(x, y) {
					let b = new Date(y.edate).getMonth() - new Date(y.sdate).getMonth();
					b = (b < 0) ? 12 + b : b;
					let d = new Date(y.sdate);
					let e = d;
					b = f + b;
					for (let c = f; c <= b; c++) {
						v["M" + parseInt(e.getMonth()) + "_" + e.getFullYear()] = y.share;
						e = new Date(d.setMonth(d.getMonth() + 1));
					}
					f = b;
				});
			});

			for (let i = 0; i <= diff_year; i++) {
				let g = new Date("01/01/" + xdate);
				for (let y = 0; y < aMonthL.length; y++) {
					let h = g;
					let i = "M" + parseInt(h.getMonth()) + "_" + h.getFullYear();
					oControl = new sap.ui.commons.TextView().bindProperty("text", i);
					oControl = new sap.m.Input({
						type: sap.m.InputType.Number,
						maxLength: 2
					}).bindProperty("value", i);
					oColumn = new sap.ui.table.Column({
						multiLabels: [new sap.m.Label({
							text: xdate
						}), new sap.m.Label({
							text: aMonthS[y]
						})],
						template: oControl,
						headerSpan: [12, 1],
						autoResizable: false,
						width: "60px"
					});
					oTable.addColumn(oColumn, {
						autoResizable: false
					});
					h = new Date(g.setMonth(g.getMonth() + 1));
				}
				xdate++;
			}

			oTable.setFixedColumnCount(2);

			var oModel = new sap.ui.model.json.JSONModel();
			// oModel.setData(oData);
			oModel.setData({
				modelData: oaData
			});

			oTable.setModel(oModel);
			oTable.bindRows("/modelData");

			var oModel1 = new sap.ui.model.json.JSONModel();
			oModel1.setData({
				table: oData
			});
			this.getView().setModel(oModel1);

		},
		_createColumn: function(a, b, c, d, e, f) {
			a = new sap.ui.commons.TextView().bindProperty(b, c)
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
});