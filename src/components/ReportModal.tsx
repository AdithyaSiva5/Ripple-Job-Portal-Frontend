import { Modal, Label, Radio, Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { toast } from "sonner";
import { reportPost } from "../services/api/user/apiMethods";

function ReportModal({ userId, postId, openReportModal, closeReportModal }:any) {
  const [reportCause, setReportCause] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReport = () => {
    setIsLoading(true);
    reportPost({ userId, postId, cause: reportCause })
      .then((resposne) => {
        toast.info("You have reported this post"); 
        setIsLoading(false);

        closeReportModal();
      })
      .catch((err) => {
        toast.error(err.message);
        setIsLoading(false);
        console.log(err);
        closeReportModal();
      });
  };

  return (
    <div>
      <Modal show={openReportModal} className="bg-transparent mt-44" size="md" onClose={closeReportModal} popup>
        <Modal.Header />
        <Modal.Body>
          <fieldset className="flex max-w-md flex-col gap-4">
            <legend className="mb-4 text-sm font-medium">Choose your Report cause</legend>
            <div className="flex items-center gap-2">
              <Radio
                id="nudity"
                className="text-xs"
                name="reportCause"
                value="Post contains nudity"
                onChange={(e) => setReportCause(e.target.value)}
              />
              <Label    className="text-xs"  htmlFor="nudity">Post contains nudity</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
               className="text-xs"
                id="racist-content"
                name="reportCause"
                value="Racist content"
                onChange={(e) => setReportCause(e.target.value)}
              />
              <Label   className="text-xs" htmlFor="racist-content">Racist content</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
               className="text-xs"
                id="violence"
                name="reportCause"
                value="Post contains violence"
                onChange={(e) => setReportCause(e.target.value)}
              />
              <Label    className="text-xs"  htmlFor="violence">Post contains violence</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
            
                id="hate-speech"
                name="reportCause"
                value="Hate speech"
                onChange={(e) => setReportCause(e.target.value)}
              />
              <Label     className="text-xs" htmlFor="hate-speech">Hate speech</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
           
                id="spam"
                name="reportCause"
                value="Spam or misleading"
                onChange={(e) => setReportCause(e.target.value)}
              /> 
              <Label    className="text-xs"  htmlFor="spam">Spam or misleading</Label>
            </div>
            <Button onClick={handleReport} color="white"    className="text-xs text-red-600 border">
              {isLoading && (
                <Spinner color="failure" aria-label="Failure spinner example" />
              )}
              <div className="text-xs">
              Report
              </div>
             
            </Button>
          </fieldset>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ReportModal;