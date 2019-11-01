# DB設計


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|String|null: false|
|password|integer|null: false|
|email|integer|null: false, unique: true|


### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|
|image|String|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|String|null: false|


### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user