import ProfileFieldCard from './ProfileFieldCard';
import { useAppSelectore } from '../../../Redux Toolkit/store';

const UserDetails = () => {

  const {user} = useAppSelectore(store=> store)

  return (
    <div className='space-y-5'>
        <ProfileFieldCard keys={"Name"} value={user.user?.fullName} />
        <ProfileFieldCard keys={"Email"} value={user.user?.email} />
        <ProfileFieldCard keys={"Mobile"} value={user.user?.mobile || "Not Provided"} />
    </div>
  )
}

export default UserDetails;
