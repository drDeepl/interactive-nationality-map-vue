import instance from "./main";

const path = "/user-audio";

const TAG = "ApiUserAudio";

class ApiUserAudio {
  async getById(userAudioId) {
    console.log(`${TAG}`);
    return instance.get(`${path}/${userAudioId}`);
  }
}

export default new ApiUserAudio();
