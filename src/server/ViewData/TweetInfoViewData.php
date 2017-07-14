<?php

/**
 *
 * @author Takayuki_suzuki
 */
class TweetInfoViewData
{
    /**
     * @var string
     */
    private $description;

    /**
     * @var integer
     */
    private $favouritesCount;

    /**
     * @var integer
     */
    private $url;

    /**
     * @var integer
     */
    private $createdAt;

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return int
     */
    public function getFavouritesCount()
    {
        return $this->favouritesCount;
    }

    /**
     * @param int $favouritesCount
     */
    public function setFavouritesCount($favouritesCount)
    {
        $this->favouritesCount = $favouritesCount;
    }

    /**
     * @return int
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param int $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
    }

    /**
     * @return int
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param int $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }
}
