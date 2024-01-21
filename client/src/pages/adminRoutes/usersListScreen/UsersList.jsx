import React from 'react'
import { toast } from 'react-toastify'
import { useGetUsersQuery, useDeleteUsersMutation } from '../../../slices/usersApi'
import { FaCheck, FaTimes, FaTrash, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import Loading from '../../../components/LoadingComponent/Loading'
import Message from '../../../components/MessageComponent/Message'
const UsersList = () => {
  const { data:users, isLoading, isError, refetch} = useGetUsersQuery()
  const [deleteuser, {isLoading:loadingDLT}] = useDeleteUsersMutation()

 
  const handleDelete = async (userId) => {
    try {
      const response = await deleteuser(userId);
      if (response.error) {
        toast.warning('Admin users cannot be deleted');
           
      } else {
        refetch();
        toast.success('User deleted');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting the user');
    }
  };
  
  if(isLoading) return <Loading />
  if(isError) return <Message variant='danger'>something went wrong fetching users</Message>
  return (
    <div className='orders'>
    <div className='orders-container'>
       <h2  className='profile-title'>
           users List</h2>
       <Table responsive striped hover bordered className='table-sm'>
            <thead>
                <tr>
                    <th className='text-center tb-header'>ID</th>
                    <th className='text-center tb-header'>EMAIL</th>
                    <th className='text-center tb-header'>NAME</th>
                    <th className='text-center tb-header'>IS ADMIN</th>
                    <th className='text-center tb-header'>IS VERIFIED</th>
                    <th className='text-center tb-header'>EDIT</th>
                    <th className='text-center tb-header'>DELETE</th>
                </tr>
            </thead>
            <tbody>
               {users.map(user => (
                   <tr key={user._id}>
                       <td className='text-center tb-header'> 
                           {user._id}
                       </td>
                       <td className='text-center tb-header'>
                            {user.email}
                       </td>
                       <td className='text-center tb-header'>
                           {user.name}
                       </td>
                       <td className='text-center tb-header'>
                       {user.isAdmin ? (
                              <FaCheck color='green' />
                           ): (
                               <FaTimes  color='red'/>
                           )}
                       </td>
                       <td className='text-center tb-header'>
                           {user.isVerified ? (
                              <FaCheck color='green' />
                           ): (
                               <FaTimes  color='red'/>
                           )}
                       </td>
                       <td className='text-center tb-header'>
                          
                       <Link to={`/admin/user/${user._id}/edit`}>
                            <Button variant='light'  className='btn-sm m-0'>
                                <FaEdit color='green' />
                            </Button>
                          </Link>
                          
                       </td>
                       <td className='text-center tb-header'>
                         
                            <Button disabled={loadingDLT} onClick={()=> handleDelete(user._id)} variant='light'  className='btn-sm m-0'>
                                <FaTrash  color='red' />
                            </Button>
                         
                       </td>
                   </tr>
               ))}
            </tbody>
       </Table>
    </div>
</div>
  )
}

export default UsersList