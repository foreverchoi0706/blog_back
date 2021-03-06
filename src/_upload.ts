import multer, { StorageEngine, Multer } from "multer";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, path.join('./public/uploads')); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: (_, __, cb) => {
        cb(null, `${new Date().valueOf()}.png`); // cb 콜백함수를 통해 전송된 파일 이름 설정
    },
});

const upload: Multer = multer({
    storage: storage,
});

export default upload;