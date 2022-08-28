import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { useLazyGetSingleTaskQuery } from '../features/api/apiSlice';
import { setFormData, setFormType, showForm } from '../features/tasks/tasksSlice';
import { scrollToTop } from '../utils/scrollToTop';

const TaskItem = ({ date,description, id}) => {
  
  const dispatch = useDispatch();
  
  const [trigger, ] = useLazyGetSingleTaskQuery();
  
  const editTaskHandler = async () => {
    const { data, isLoading, isError, error }  = await trigger(id);
    const {
    task_msg: taskDescription,
    task_date: taskDate,
    user_id: userId,
    id: taskId,
    user_name: username
  } = data.results
    scrollToTop();
    const payload = { taskDescription, taskDate, userId, taskId, username };
    dispatch(setFormData(payload));
    dispatch(setFormType("edit"));
    dispatch(showForm());
  };
  
  return (
    <div className='mt-4 bg-gray-200 px-2 py-2 shadow-xl'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-4'>
          <img src="" alt="" className='w-12 h-12 bg-slate-500'/>
          <span>
            {description} <br />{date}
          </span>
        </div>
        <div>
          <button>
            <AiFillEdit onClick={editTaskHandler} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem