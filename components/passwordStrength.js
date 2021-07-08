import { score } from "utils/front/password";

export default function PasswordStrength({ password }) {
  const { percent, title, message, color } = score(password);
  if (!percent) return null;
  return (
    <div className="">
      <div className="mt-2 block text-sm font-medium text-gray-700">
        {title}
      </div>
      <div className="relative w-full bg-gray-200 rounded-md h-1 my-2">
        <div
          className={`w-1/2 ${color} rounded-md h-1 transition duration-100 ease-in-out`}
          style={{ width: `${percent}%`}}
          />
      </div>
      <span className="mt-2 text-sm text-gray-500">
        {message}
      </span>
    </div>
  );
}
