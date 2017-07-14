<?php

require './build/TwistOAuth.phar';
require './ViewData/TweetInfoViewData.php';
require './ViewData/UserInfoViewData.php';

/**
 * Google検索を行うクラス
 *
 */
class twitterAnalyse
{
    function exec($keyword)
    {

        // 初期設定
        $consumer_key = 'pEhDjQWuIDHMWu7YXyrkepdEA';
        $consumer_secret = 'OgrDJG7DoknpVQWcdax60FywwPqUgqqTuZm4FZ1ExSSKx0HUek';
        $access_token = '181519252-EkiHOttWSXARHxKbllOxxt51w2dUGgqZ4Kg0bwQd';
        $access_token_secret = 'dzUzMiG0EhjahNEE7it41usnVWj1KErbpv5tVFeMUEQUe';

        $connection = new TwistOAuth($consumer_key, $consumer_secret, $access_token, $access_token_secret);

        $tweetResults = [];

        $isFirst = true;
        $tempResults = [];
        for ($i = 0; $i < 30; $i++) {

            if ($isFirst) {
                $maxId = null;
                $isFirst = false;
            } else {
                $maxId = $tweetResults[99]->id;
            }

            // ハッシュタグによるツイート検索
            $hash_params = [
                'q' => '#' . $keyword,
                'count' => 100,
                'lang' => 'ja',
                'locale'=> 'ja',
//            'until'=> '2017-04-29',
//                'since' =>'2017-04-28',
//            'since_id'=>858503625307553800,
                'max_id' => $maxId,
//            'page' =>1,
//            'result_type'=>'popular'
            ];

            $tweetResults = $connection->get('search/tweets', $hash_params)->statuses;

            foreach ($tweetResults as $tweetResult) {
//                var_dump($tweetResult);
                $tempResults[$tweetResult->user->followers_count] = $tweetResult;
            }

        }

//        // ハッシュタグによるツイート検索
//        $hash_params = [
//            'q' => '#' . $keyword,
//            'count' => 100,
//            'lang' => 'ja',
////            'until'=> '2015-07-19',
////            'since_id'=>858503625307553800,
//            'max_id'=>858503625307553800,
////            'page' =>1,
////            'result_type'=>'popular'
//        ];
//
//        $tweetResults = $connection->get('search/tweets', $hash_params)->statuses;

        $results = [];

        foreach ($tempResults as $tweetResult) {

            $results[$tweetResult->user->followers_count] = $tweetResult;

        }
        arsort($results);
//        $results = array_slice($results , 0, 5);

        $results = $this->tweetTimeZone($results);

        $concatTweetText = '';
        foreach ($tweetResults as $tweetResult) {
            $concatTweetText = $concatTweetText . $tweetResult->text;
        }
        $word_list = $this->analysisKeyword($concatTweetText);

        $results['wordList'] = $word_list;

        return $results;
    }


    private function obj2arr($obj, $replaceTarget)
    {
        if (!is_object($obj)) return $obj;

        $arr = (array)$obj;
        $temp = [];

        foreach ($arr as $name => &$a) {
            $temp[preg_replace($replaceTarget, '', $name)] = $this->obj2arr($a);
//            $temp[$name]= $this->obj2arr($a);
        }

        return $temp;
    }

    public function analysisKeyword($bodyKeywordData)
    {

        $outputs = array_reverse(preg_split("/EOS|\n/u", shell_exec(sprintf('echo %s | /usr/local/bin/juman', escapeshellarg($bodyKeywordData)))));

        // 名詞を抽出
        $meisiList = [];    //名詞配列
        foreach ($outputs as $output) {
            if (preg_match('/名詞/', $output)) {
                $chars = preg_split('/ /', $output, -1, PREG_SPLIT_OFFSET_CAPTURE);
                $meisiList[] = $chars[0][0];
            }
        }

        $word_list = [];
        $word_list_index = [];

        foreach ($meisiList as $meisi) {
            $key = array_search($meisi, $word_list_index);
            if ($key === false) {// 新出
                if ($meisi == '@') {
                    continue;
                }
                $word_list[] = ['count' => 1, 'word' => $meisi];
                $word_list_index[] = $meisi;
            } else {// 既出
                $word_list[$key]['count'] = $word_list[$key]['count'] + 1;
            }
        }

        unset($word_list_index);
        arsort($word_list);

        return array_slice($word_list, 0, 10);
    }

    public function tweetTimeZone($results)
    {
        $months = [];
        $month = null; //nullでも構いません
        for ($i = 4; $i < 16; $i++) {
            $months[] = date('Y-m', mktime(0, 0, 0, date('n') - $i, 1, date('Y')));
        }

        $timeZoneList = ['01' => 0, '02' => 0, '03' => 0, '04' => 0, '05' => 0, '06' => 0,
            '07' => 0, '08' => 0, '09' => 0, '10' => 0, '11' => 0, '12' => 0, '13' => 0,
            '14' => 0, '15' => 0, '16' => 0, '17' => 0, '18' => 0, '19' => 0, '20' => 0, '21' => 0, '22' => 0, '23' => 0, '24' => 0];

        $tweetCreatedList = [];
        $tweetCreatedMounthList = [];
        foreach ($results as $result) {
            $date = new DateTime($result->created_at);
            $tweetCreatedList[] = $date->format('H');
            $tweetCreatedMounthList[] = $date->format('Y-m-d');
        }

        foreach ($timeZoneList as $keyHour => &$timeZone) {
            foreach ($tweetCreatedList as $tweetCreated) {
                if ($keyHour == $tweetCreated) {
                    $timeZone++;
                }
            }
        }


//        $tempTimeZoneList=[];
//        foreach ($timeZoneList as $count) {
//
//            $tempTimeZoneList[] = $count;
//        }

        $results['timeZoneList'] = $timeZoneList;
        return $results;
    }

}

//$isFirst = true;
//$mostFollowersCount = 0;
//$mostTweet = new \stdClass;

//foreach ($tweetResults as $tweetResult) {
// 初回だけ最初ツイート格納
//            if($isFirst){
//                $mostFollowersCount = $tweetResult->user->followers_count;
//                $isFirst = false;
//                $mostTweet = $tweetResult;
//                continue;
//            }

// 既存のツイートよりフォロワーが多い場合
//            if($mostFollowersCount < $tweetResult->user->followers_count){
//
//                // 最大数を上書き
//                $mostFollowersCount = $tweetResult->user->followers_count;
//                $results[$mostFollowersCount] = $mostTweet;
//                $mostTweet = $tweetResult;
//                continue;
//
//            } else {
//$results[$tweetResult->user->followers_count] = $tweetResult;

//            }
//
//private function createViewData($value)
//{
//    $results = [];
//
//    $tweetInfoViewData = new TweetInfoViewData();
//    $userInfoViewData = new UserInfoViewData();
//
//    $userInfoViewData->setProfileImageUrl($value->user->profile_image_url);
//    $userInfoViewData->setScreenName($value->user->screen_name);
//    $userInfoViewData->setUserId($value->id_str);
//
//    $tweetInfoViewData->setCreatedAt(date('Y/m/d H:i', strtotime($value->created_at)));
//    $tweetInfoViewData->setUrl('https://twitter.com/' . $userInfoViewData->getScreenName() . '/status/' . $userInfoViewData->getUserId());
//
//    return [
//        'userInfo' =>   $this->obj2arr($userInfoViewData,'/UserInfoViewData/') ,
//        'tweetInfo' =>$this->obj2arr($tweetInfoViewData,'/TweetInfoViewData/')
////            'userInfo' =>   (array)$userInfoViewData ,
////            'tweetInfo' => (array)$tweetInfoViewData
//    ];
//}

?>





