const AvatarStack = ({ count }: { count: number }) => {
  const overflow = count > 2 ? count - 2 : 0;

  return (
    <div className="flex items-center">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="size-6 rounded-full bg-brand-Text-200 outline-2 outline-white -ml-1 first:ml-0"
        />
      ))}
      {overflow > 0 && (
        <div className="size-6 rounded-full bg-zinc-200 outline-2 outline-white -ml-1 flex items-center justify-center text-xs text-gray-800">
          +{overflow}
        </div>
      )}
    </div>
  );
};

export default AvatarStack;
