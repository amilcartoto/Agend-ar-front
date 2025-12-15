



export default function FloatingUserStatus({ isLoggedIn, onToggle }) {
  return (
    <div className="fixed bottom-4 right-4 z-[999] bg-white p-2 rounded-lg shadow-xl">
      <button
        onClick={onToggle}
        className="px-3 py-1 rounded text-xs font-bold bg-green-100 text-green-700"
      >
        {isLoggedIn ? '🟢 USUARIO' : '🔴 INVITADO'}
      </button>
    </div>
  );
}
