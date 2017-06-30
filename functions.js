export const get_column= (col_no,array)=> [array[0][col_no],array[1][col_no],array[2][col_no]];
export const get_diagonal=(cell,array)=> {
	let a=[array[0][0],array[1][1],array[2][2]];
	let b=[array[2][0],array[1][1],array[0][2]];
	if (cell==='00'||cell==='22') {
		return a;
	}
	if (cell==='20'||cell==='02') {
		return b;
	}
	if (cell==='11') {
		return[a,b];
	}
	throw "cell not a diagonal cell";
}
export const get_row=(row_no,array)=>array[row_no];
export const display_game_html=(e,id,resolve)=>{
			document.getElementById(id).innerHTML=`<div class="container">
			<div class="row">
			<div class="cell cell2" data-position="1"></div>
			<div class="cell cell2" data-position="2"></div>
			<div class="cell cell2"data-position="3"></div>
			</div>
			<div class="row">
			<div class="cell cell2" data-position="4"></div>
			<div class="cell cell2" data-position="5"></div>
			<div class="cell cell2" data-position="6"></div>
			</div>
			<div class="row">
			<div class="cell cell2" data-position="7"></div>
			<div class="cell cell2" data-position="8"></div>
			<div class="cell cell2" data-position="9"></div>
			</div>
			</div>
			`;
			resolve(e.target.id);
}

export const display_x_or_o=id=>{
	document.getElementById(id).innerHTML=`<div class="msg">
	<p class="or-wrapper"><a id="x" class="xo btn btn-primary">X</a><span class="or">OR</span><a id="o" class="xo btn btn-secondary">O</a></p>
	</div>`;
	return new Promise((resolve,reject)=>{
		document.getElementById("x").addEventListener('click',e=>display_game_html.call(null,e,id,resolve));

		document.getElementById("o").addEventListener('click',e=>display_game_html.call(null,e,id,resolve));
	});

}
export const handle_cell_click_event=(e,appId,boardData,gameData,array,init_game,start_game,cells,wrapper_handle_cell_click_event)=>{
			
			cells().map(cell=>{
				return cell.removeEventListener('click',wrapper_handle_cell_click_event);
			});
			if (e.target.className==='x'||e.target.className==='o'){
				return;
			}
			const position=parseInt(e.target.getAttribute('data-position'));
			const col_no=boardData.getPostionColNo(position);
			const row_no=boardData.getPostionRowNo(position);
			const player_type=gameData.players[gameData.turn];
			const player_type_value=player_type ==='x'?1:4;
			const cell=boardData.getPostionCell(position);
			//let isFreeCell=is_cell_free(position,boardData);
			if (is_cell_free(position,boardData)){
				gameData=game_data_reducer(gameData,{type:'set_last',value:position});
				gameData=game_data_reducer(gameData,{type:'increase_moves',value:null});
				gameData=game_data_reducer(gameData,{type:'reduce_plays',value:position});
				array=play_move(player_type_value)(array,row_no,col_no);
				const lastPlay_play_cell=document.querySelector(`[data-position="${e.target.getAttribute('data-position')}"]`);
				lastPlay_play_cell.innerHTML=gameData.players[gameData.turn]==='o'?`<div class="o"></div>`:`<div class="x"></div>`;
				lastPlay_play_cell.className=lastPlay_play_cell.className.replace('cell2','');
				if (is_game_won(position,col_no,row_no,player_type_value,array,cell)) {
					handle_win(appId,player_type);
					setTimeout(()=>init_game(),2000);
					return;
				}
				else{
					if (gameData.moves>=9){
						handle_draw(appId);
						setTimeout(()=>init_game(),2000);
						return;
					}
					gameData=game_data_reducer(gameData,{type:'change_turn',value:null});
					start_game(appId,cells,boardData,gameData,1,document,game_data_reducer,is_game_won,play_move,handle_cell_click_event,display_x_or_o,is_cell_free,array);
					return;
				}
			}
			return;
	};
export const is_cell_free=(position,data)=>{
	if (data.getPostionValue(position)()!==undefined) {
		return false;
	} 
	return true;
}

export const game_data_reducer= (state,action)=>{
	return {
		plays:playsReducer(state.plays,action),
		players:playersReducer(state.players,action),
		lastPlay:lastPlayReducer(state.lastPlay,action),
		turn:turnReducer(state.turn,action),
		moves:movesReducer(state.moves,action),
		status:statusReducer(state.status,action),
		winner:winnerReducer(state.winner,action)
	}
	function playsReducer(state,action){
		switch(action.type){
		case 'reduce_plays': 
		const i=state.indexOf(action.value);
		if ( i!==-1) {
			return[
			...state.slice(0,i),
			...state.slice(i+1)
			]
		}
		return state;
		default:
      return state
	}
	}
	function playersReducer(state,action){
		switch(action.type){
			case 'set_players':
			const player2=action.value==='x'?'o':'x';
			return{
				1:action.value,
				2:player2
			}
			default:
      return state
		}
	}
	function lastPlayReducer(state,action){
		switch(action.type){
			case 'set_last':
			return action.value;
			default:
      return state;
		}
	}
	function turnReducer(state,action){
		switch(action.type){
			case 'change_turn':
			const turn=state===1?2:1;
			return turn;
			default:
      return state;
		}
	}
	function movesReducer(state,action){
		switch(action.type){
			case 'increase_moves':
			return ++state;
			default:
      return state;
		}
	}
	function statusReducer(state,action){
		switch(action.type){
			default:
      return state
		}
	}
	function winnerReducer(state,action){
		switch(action.type){
			default:
      return state
		}
	}
}
export const is_game_won=(position,col_no,row_no,player_type_value,array,cell)=>{
	const player_type_value_sum=player_type_value*3;
	const col=get_column(col_no,array);
	const row=get_row(row_no,array);
	let sum_of_row,sum_of_col,diagonals,sum_of_diagonals;
	if (['00','22','11','02','20'].indexOf(cell) !==-1) {
		diagonals=get_diagonal(cell,array);
		if (col.indexOf(undefined) ===-1 || (row.length>0 || row.indexOf(undefined) ===-1) || diagonals.indexOf(undefined)===-1){
			sum_of_row=sum_array(row,(sum,val)=>{
				if (val !==undefined){
					return sum+val;
				} 
				return sum;
			});
			sum_of_col=sum_array(col,(sum,val)=>{
				if (val !==undefined){
					return sum+val;
				} 
				return sum;
			});
			sum_of_diagonals=sum_diagonals(diagonals,(sum,val)=>{
				if (Array.isArray(val)){
					sum.push(sum_array(val,(sum,val)=>{
						if (val !==undefined){
							return sum+val;
						} 
						return sum;
						}));
					return sum;	
				}
				if(sum[0]!==undefined){
					if (val !==undefined) {
						sum[0]+=val;
					}
				  return sum;
				}
					sum[0]=val;
					return sum;
			}) || [];
			
			if (sum_of_col===player_type_value_sum|| sum_of_row===player_type_value_sum || sum_of_diagonals.indexOf(player_type_value_sum)  !== -1){
				return true;
			}
			return false;
		}
		return false;
	}
	if (col.indexOf(undefined) ===-1 || (row.length>0 && row.indexOf(undefined) ===-1)){
		sum_of_row=sum_array(row,(sum,val)=>{
				if (val !==undefined){
					return sum+val;
				} 
				return sum;
			});
		sum_of_col=sum_array(col,(sum,val)=>{
				if (val !==undefined){
					return sum+val;
				} 
				return sum;
			});
		if (sum_of_col===player_type_value_sum|| sum_of_row===player_type_value_sum){
				return true;
			}
			return false;
	}
	return false;
}
export const sum_array=(array,callback)=>{
	return array.reduce(callback,0);
}
export const sum_diagonals=(array,callback)=>{
	return array.reduce(callback,[]);
}
export const play_move=(val)=>{
	return change_board.bind(null,val);
}
export const change_board=(val,board,row,col)=>{
	let newBoard=[...board];
	newBoard[row][col]=val;
	return newBoard;
}

export const handle_draw=appId=>{
	document.getElementById(appId).innerHTML=`<h1 class="draw">DRAW</h1>`;

}
export const handle_win=(appId,player_type)=>{
	document.getElementById(appId).innerHTML=`<h1 class="draw">${player_type} won</h1>`;

}