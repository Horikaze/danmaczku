type ModalProps = {
  children: React.ReactNode;
  setMyRequests: (toogle: boolean) => void;
  title: string;
};
export default function Modal({ children, setMyRequests, title }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 z-20 backdrop-blur flex justify-center items-center">
      <div className="flex flex-col w-11/12 z-30 text-text bg-card rounded-sm p-4">
        <div className="grid grid-cols-3">
          <div className="col-start-2 flex text-lg justify-center items-center">
            <h1 className="font-bold text-text">{title}</h1>
          </div>
          <div className="col-start-3 flex justify-end">
            <button
              className="bg-orange-400 text-white hover:bg-orange-500 drop-shadow-sm rounded-sm px-4 py-2"
              onClick={() => {
                setMyRequests(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
