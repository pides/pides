var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameInfoUI=(function(_super){
		function GameInfoUI(){
			
		    this.pauseBtn=null;
		    this.hpLabel=null;
		    this.levelLabel=null;
		    this.scoreLabel=null;
		    this.infoLabel=null;
		    this.gameRestart=null;

			GameInfoUI.__super.call(this);
		}

		CLASS$(GameInfoUI,'ui.GameInfoUI',_super);
		var __proto__=GameInfoUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameInfoUI.uiView);
		}

		STATICATTR$(GameInfoUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":480,"height":852},"child":[{"type":"Button","props":{"y":11,"x":399,"var":"pauseBtn","stateNum":"1","skin":"war/btn_pause.png"}},{"type":"Label","props":{"y":22,"x":22,"var":"hpLabel","text":"HP:19","fontSize":20,"color":"#14ff00"}},{"type":"Label","props":{"y":22,"x":100,"var":"levelLabel","text":"Level:10","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":22,"x":190,"var":"scoreLabel","text":"Score:100","fontSize":20,"color":"#65ff00"}},{"type":"Label","props":{"y":374,"x":121,"var":"infoLabel","text":"GameOver","fontSize":50,"color":"#ffffff"}},{"type":"Label","props":{"y":431,"x":177,"var":"gameRestart","text":"Click Any Where ReStart","color":"#ffffff","alpha":1}}]};}
		]);
		return GameInfoUI;
	})(View);