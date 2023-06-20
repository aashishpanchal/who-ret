export default function Logo() {
  return (
    <div className="flex my-1 -mt-1 items-center cursor-pointer">
      <img src="/who-ret-icon.png" alt="Logo" className="block w-20" />
      <span
        className={
          "text-2xl underline whitespace-pre text-primary-1 font-Poppins"
        }
      >
        Who Ret
      </span>
    </div>
  );
}
