/**
 * Created by roije on 2/9/17.
 */
import { ADD_FLASH_MESSAGE } from '../types';

export function addFlashMessage(message){
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}