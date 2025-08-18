import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  deleteUser,
  removeUserDataFromStore,
} from "../app/features/auth/authSlice";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleDeleteAccount = async () => {
    const result = await dispatch(deleteUser());
    if (result.success) {
      dispatch(removeUserDataFromStore());
      return navigate("/");
    }
  };

  return (
    <div className="mx-auto my-10 max-w-md rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Profile</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Name:</span> {user.username}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {user.role}
        </p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleDeleteAccount}
          className="rounded-md bg-red-600 p-2 text-white hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
