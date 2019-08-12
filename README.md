# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false|

### Associaton
- has_many :groups, through: members
- has_many :messages
- has_many :members

## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: members
- has_many :messages
- has_many :members

## message table

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|references|null: fasle, foreign_key: true|
|user_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

### groups_users table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: fasle, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group