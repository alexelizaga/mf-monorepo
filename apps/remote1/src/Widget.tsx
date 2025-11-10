import { useAppStore } from 'host/store'; // import directo desde el host

export default function Widget() {
  const { user, setUser } = useAppStore();

  return (
    <div style={{border:"1px dashed #999", padding:8}}>
      Remote1 Widget
      <button
        onClick={() => setUser({ name: 'Lidia', loggedIn: true })}
        style={{ background: 'gold', padding: '8px 16px', marginLeft: 8 }}
      >
        Cambiar usuario → {user.name}
      </button>
    </div>
  );
}
