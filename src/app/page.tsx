
import Title from '@/components/top/title';
import StartButton from '@/components/top/startButton';

export default function Home() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <Title />
        <StartButton />
      </div>
      <Button onClick={handleEdit} background='black' textColor='white'>
        スケジュールを編集
      </Button>

      <AttendanceEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
