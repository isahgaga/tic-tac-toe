import {display_x_or_o,is_cell_free,game_data_reducer,is_game_won,play_move,handle_cell_click_event} from './functions.js'
import {game_data,board_data} from './gamedata.js'

const cells=()=>[...document.querySelectorAll(".cell2")];
const start_game=(appId,cells,boardData,gameData,flag,document,game_data_reducer,is_game_won,play_move,handle_cell_click_event,display_x_or_o,is_cell_free,array)=>{
	const wrapper_handle_cell_click_event=e=>{
		return handle_cell_click_event.call(null,e,appId,boardData,gameData,array,init_game,start_game,cells,wrapper_handle_cell_click_event);
	}
 	if (flag===0) {
 		 boardData=boardData();
 		 gameData=gameData();
 		
 		display_x_or_o(appId).then((id)=>{
 			
			gameData=game_data_reducer(gameData,{type:'set_players',value:id});
			
			//use map

			cells().map(cell=>{
				return cell.addEventListener('click',wrapper_handle_cell_click_event);
			});
			
		});
		return;
 	}
 	cells().map(cell=>{
		return cell.addEventListener('click',wrapper_handle_cell_click_event);
	});
	
};
const init_game=(()=>start_game.call(null,'app',cells,board_data,game_data,0,document,game_data_reducer,is_game_won,play_move,handle_cell_click_event,display_x_or_o,is_cell_free,board_data().getBoard()));
window.onload=init_game;
