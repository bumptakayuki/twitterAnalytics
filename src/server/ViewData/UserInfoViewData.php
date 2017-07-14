<?php

/**
 *
 * @author Takayuki_suzuki
 */
class UserInfoViewData
{
    /**
     * @var integer
     */
    private $userId;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $profileImageUrl;

    /**
     * @var string
     */
    private $profileBannerUrl;

    /**
     * @var integer
     */
    private $screenName;

    /**
     * @var integer
     */
    private $statusesCount;

    /**
     * @var integer
     */
    private $friendsCount;

    /**
     * @var integer
     */
    private $following;

    /**
     * @var string
     */
    private $location;

    /**
     * @var integer
     */
    private $listedCount;

    /**
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * @param int $userId
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getProfileImageUrl()
    {
        return $this->profileImageUrl;
    }

    /**
     * @param string $profileImageUrl
     */
    public function setProfileImageUrl($profileImageUrl)
    {
        $this->profileImageUrl = $profileImageUrl;
    }

    /**
     * @return string
     */
    public function getProfileBannerUrl()
    {
        return $this->profileBannerUrl;
    }

    /**
     * @param string $profileBannerUrl
     */
    public function setProfileBannerUrl($profileBannerUrl)
    {
        $this->profileBannerUrl = $profileBannerUrl;
    }

    /**
     * @return int
     */
    public function getScreenName()
    {
        return $this->screenName;
    }

    /**
     * @param int $screenName
     */
    public function setScreenName($screenName)
    {
        $this->screenName = $screenName;
    }

    /**
     * @return int
     */
    public function getStatusesCount()
    {
        return $this->statusesCount;
    }

    /**
     * @param int $statusesCount
     */
    public function setStatusesCount($statusesCount)
    {
        $this->statusesCount = $statusesCount;
    }

    /**
     * @return int
     */
    public function getFriendsCount()
    {
        return $this->friendsCount;
    }

    /**
     * @param int $friendsCount
     */
    public function setFriendsCount($friendsCount)
    {
        $this->friendsCount = $friendsCount;
    }

    /**
     * @return int
     */
    public function getFollowing()
    {
        return $this->following;
    }

    /**
     * @param int $following
     */
    public function setFollowing($following)
    {
        $this->following = $following;
    }

    /**
     * @return string
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * @param string $location
     */
    public function setLocation($location)
    {
        $this->location = $location;
    }

    /**
     * @return int
     */
    public function getListedCount()
    {
        return $this->listedCount;
    }

    /**
     * @param int $listedCount
     */
    public function setListedCount($listedCount)
    {
        $this->listedCount = $listedCount;
    }
}
