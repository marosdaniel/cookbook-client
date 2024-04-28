import { IProps } from './types';

const YoutubeEmbed = ({ youtubeLink }: IProps) => {
  const lastEqualSignIndex = youtubeLink.lastIndexOf('=');
  const videoId = youtubeLink.slice(lastEqualSignIndex + 1);

  return (
    <div className="video-responsive">
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
