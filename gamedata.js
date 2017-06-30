export const board_data= ()=>{
	let obj={};
	let board=[[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
	let game={};
	obj[1]={value:()=>board[0][0],cell:'00',col_no:0,row_no:0};
	obj[2]={value:()=>board[0][1],cell:'01',col_no:1,row_no:0};
	obj[3]={value:()=>board[0][2],cell:'02',col_no:2,row_no:0};
	obj[4]={value:()=>board[1][0],cell:'10',col_no:0,row_no:1};
	obj[5]={value:()=>board[1][1],cell:'11',col_no:1,row_no:1};
	obj[6]={value:()=>board[1][2],cell:'12',col_no:2,row_no:1};
	obj[7]={value:()=>board[2][0],cell:'20',col_no:0,row_no:2};
	obj[8]={value:()=>board[2][1],cell:'21',col_no:1,row_no:2};
	obj[9]={value:()=>board[2][2],cell:'22',col_no:2,row_no:2};

	game.getBoard=()=>board;
	game.setBoard=newBoard=>board=newBoard;
	game.getPostionValue=id=>obj[id]['value'];
	game.getPostionCell=id=>obj[id]['cell'];
	game.getPostionColNo=id=>obj[id]['col_no'];
	game.getPostionRowNo=id=>obj[id]['row_no'];
	game.reset=()=>board=[[],[],[]];
	game.setCell=(val,row,col)=>board[row][col]=val;

	return game;
}
export const game_data= ()=>({
	plays:[1,2,3,4,5,6,7,8,9],
	players:{},
	lastPlay:null,
	turn:1,
	moves:0,
	status:'running',
	winner:null
});

