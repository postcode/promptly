class Reminder < ActiveRecord::Base
  attr_accessible :created_at, :message_id, :name, :program_id, :report_id, :updated_at
  attr_accessible :programs_attributes, :reports_attributes, :program_ids, :report_ids, :messages_attributes

  has_one :program
  has_one :report
  has_one :message

  accepts_nested_attributes_for :program, :reject_if => lambda { |a| a[:content].blank? }
  accepts_nested_attributes_for :report, :reject_if => lambda { |a| a[:content].blank? }
  accepts_nested_attributes_for :message, :reject_if => lambda { |a| a[:content].blank? }
end
